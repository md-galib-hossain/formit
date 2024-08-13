import { db } from "@/configs";
import { subscriptions, users, plans, subscriptionPeriods } from "@/configs/schema";
import { stripe } from "@/lib/getStripe";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper function to get planId based on plan name
async function getPlanId(planName: string): Promise<number> {
  const plan = await db
    .select()
    .from(plans)
    .where(eq(plans.name, planName))
    .execute()
    .then(result => result[0]);

  if (!plan) throw new Error(`${planName} plan not found`);
  return plan.id;
}

// Helper function to get periodId based on priceId
function getPeriodId(priceId: string): number {
  return priceId === process.env.STRIPE_YEARLY_PRICE_ID ? 2 : 1;
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          { expand: ["line_items"] }
        );
        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, customerDetails.email))
            .execute();

          if (!user) throw new Error("User not found");

          if (!user.customerId) {
            await db
              .update(users)
              .set({ customerId })
              .where(eq(users.id, user.id))
              .execute();
          }

          const lineItems = session.line_items?.data || [];
          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === "recurring";

            if (isSubscription) {
              const endDate = new Date();
              if (priceId === process.env.STRIPE_YEARLY_PRICE_ID!) {
                endDate.setFullYear(endDate.getFullYear() + 1);
              } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID!) {
                endDate.setMonth(endDate.getMonth() + 1);
              } else {
                throw new Error("Invalid priceId");
              }

              const existingSubscription = await db
                .select()
                .from(subscriptions)
                .where(eq(subscriptions.userId, user.id))
                .execute()
                .then(result => result[0]);

              if (existingSubscription) {
                await db
                  .update(subscriptions)
                  .set({
                    planId: await getPlanId("premium"),
                    periodId: getPeriodId(priceId),
                    startDate: new Date(),
                    endDate,
                    updatedAt: new Date(),
                  })
                  .where(eq(subscriptions.id, existingSubscription.id))
                  .execute();
              } else {
                await db
                  .insert(subscriptions)
                  .values({
                    userId: user.id,
                    planId: await getPlanId("premium"),
                    periodId: getPeriodId(priceId),
                    startDate: new Date(),
                    endDate,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  })
                  .execute();
              }

              await db
                .update(users)
                .set({ planId: await getPlanId("premium") })
                .where(eq(users.id, user.id))
                .execute();
            }
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          (event.data.object as Stripe.Subscription).id
        );
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.customerId, subscription.customer as string))
          .execute();

        if (user) {
          await db
            .update(users)
            .set({ planId: await getPlanId("free") })
            .where(eq(users.id, user.id))
            .execute();
        } else {
          console.error("User not found for the subscription deleted event.");
          throw new Error("User not found for the subscription deleted event.");
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling event", error);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
