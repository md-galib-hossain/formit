import { auth, currentUser } from "@clerk/nextjs/server";

export default async function getCurrentUser() {
  const { userId } = auth();
  const user = await currentUser();
  return {
    id: userId,
    email: user?.emailAddresses[0].emailAddress,
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName
  }
}
