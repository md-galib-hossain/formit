"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { TRecord } from "@/app/aiform/[formid]/page";
import FormListItemResponse from "./_components/FormListItemResponse";

const Responses = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState<TRecord[]>([]);

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, [user]);

  const getFormList = async () => {
    try {
      const result = await db
        .select()
        .from(jsonForms)
        .where(
          eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress!)
        );

      const parsedResult = result?.map((form) => ({
        ...form,
        jsonform: JSON.parse(form?.jsonform),
        theme: form.theme || "",
        background: form.background || "",
        style: form.style || {},
      }));

      setFormList(parsedResult);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(formList);

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">
        Reponses
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {formList?.map((form: TRecord, index: number) => (
          <FormListItemResponse
            jsonForm={JSON.stringify(form.jsonform)}
            formRecord={form}
          />
        ))}
      </div>
    </div>
  );
};

export default Responses;
