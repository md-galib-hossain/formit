import { ReactNode } from "react";
import { getUserData } from "@/lib/getCurrentUser";
import { SignedIn } from "@clerk/nextjs";
import DashboardClient from "./_components/LayoutClient";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserData();

  return (
    <SignedIn>
      <DashboardClient user={user}>{children}</DashboardClient>
    </SignedIn>
  );
};

export default DashboardLayout;
