import React from "react";
import { getUserData } from "@/lib/getCurrentUser";
import Dashboard from "./_components/Dashboard";

const Page = async () => {
  const user = await getUserData();

  return (
    <div className="p-14">
      <Dashboard user={user} />
    </div>
  );
};

export default Page;
