import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./_components/CreateForm";
import FormList from "./_components/FormList";
import { getUserData } from "@/lib/getCurrentUser";

const page = async() => {
  const user =await getUserData()
  return (
    <div className="p-14">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">

      <h2 className="font-bold text-3xl ">
        Dashboard
      </h2>
        <CreateForm user={user}/>
      </div>
      {/* List of forms */}
      <FormList />
    </div>
  );
};

export default page;
