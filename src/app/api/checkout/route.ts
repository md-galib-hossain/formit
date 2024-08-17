// api/payments/create-checkout-session/route.ts
 
// import { stripe } from "@/lib/getStripe";
import { getUserData } from "@/lib/getCurrentUser";
import { stripe } from "@/lib/getStripe";
// import { stripe } from "@/lib/getStripe";
import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const { priceId } = await req.json();
  const user = await getUserData();
  const userId = user?.id!;
  const email = user?.email!;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId, email, priceId },
      mode: "subscription",
      customer_email: email,
      billing_address_collection: "auto",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/dashboard/success?session_id={CHECKOUT_SESSION_ID}&&userId=${userId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/dashboard/cancel`,
   
    });
    console.log(session)
 
    return NextResponse.json({ sessionId: session.id });
    // return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error });
  }
}