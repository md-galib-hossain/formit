import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./_components/CreateForm";
import FormList from "./_components/FormList";

const page = () => {
  return (
    <div className="p-14">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">

      <h2 className="font-bold text-3xl ">
        Dashboard
      </h2>
        <CreateForm />
      </div>
      {/* List of forms */}
      <FormList />
    </div>
  );
};

export default page;
