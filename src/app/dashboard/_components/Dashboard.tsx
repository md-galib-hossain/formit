"use client";

import React, { useState } from "react";
import CreateForm from "./CreateForm";
import FormList from "./FormList";

const Dashboard = ({ user }: { user: any }) => {
  const [refetch, setRefetch] = useState(false);
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <h2 className="font-bold text-3xl">Dashboard</h2>
        <CreateForm user={user} setRefetch={setRefetch} refetch={refetch} />
      </div>
      {/* List of forms */}
      <FormList setRefetch={setRefetch} refetch={refetch}/>
    </div>
  );
};

export default Dashboard;
