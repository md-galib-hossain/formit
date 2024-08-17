import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/configs";
import { users, subscriptions } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function getUserData() {
  // Fetch the current user from Clerk
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  // Get the user's email
  const userEmail = user.emailAddresses[0].emailAddress;

  // Query the users collection to find the userId using the email
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

  // Fetch the user's subscription based on userId
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .execute()
    .then((result) => result[0]);

  let isPremium = false;
  let expiryDate = null;

  if (subscription) {
    const today = new Date();
    const startDate = new Date(subscription.startDate as any);
    const endDate = new Date(subscription.endDate as any);

    if (today >= startDate && today <= endDate) {
      isPremium = true;
      expiryDate = endDate;
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
  };
}
