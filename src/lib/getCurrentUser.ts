import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/configs";
import { users, subscriptions } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function getUserData() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const userEmail = user.emailAddresses[0].emailAddress;

  const dbUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, userEmail))
    .execute()
    .then((result) => result[0]);

  if (!dbUser) {
    throw new Error("User ID not found in database");
  }

  const userId = dbUser.id;

  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .execute()
    .then((result) => result[0]);

  let isPremium = false;
  let expiryDate = null;
  let subscriptionType: "Monthly" | "Yearly" | null = null;

  if (subscription) {
    const today = new Date();
    const startDate = new Date(subscription.startDate as any);
    const endDate = new Date(subscription.endDate as any);

    if (today >= startDate && today <= endDate) {
      isPremium = true;
      expiryDate = endDate;

      const durationInDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

      if (durationInDays <= 31) {
        subscriptionType = "Monthly";
      } else {
        subscriptionType = "Yearly";
      }
    }
  }

  return {
    id: userId,
    email: userEmail,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    isPremium,
    expiryDate,
    subscriptionType,
  };
}
