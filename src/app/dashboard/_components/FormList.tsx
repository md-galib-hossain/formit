"use client";
import { TRecord } from "@/app/aiform/[formid]/page";
import { TJsonForm } from "@/app/edit-form/[formId]/page";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import FormListItem from "./FormListItem";

// Define the type for the form list items
export type TFormItem = {
  jsonform: TJsonForm;
  id: number;
  theme: string | null;
  style: any;
  background: string | null;
  createdBy: string;
  createdDate: string;
};

const FormList = ({user,setRefetch,refetch}:any) => {
  const [formList, setFormList] = useState<TFormItem[]>([]); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user?.email) {
      getFormList();
    }
  }, [user]);

  const getFormList = async () => {
    if (user?.email) {
      setLoading(true);
      try {
        const result = await db
          .select()
          .from(jsonForms)
          .where(eq(jsonForms.createdBy, user.email))
          .orderBy(desc(jsonForms.id));

        // Map the result to parse jsonform to TJsonForm
        const parsedResult: TFormItem[] = result.map((item: any) => ({
          ...item,
          jsonform: JSON.parse(item.jsonform) as TJsonForm,
        }));

        setFormList(parsedResult);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form list:", error);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col justify-center items-center">
            {/* <Image width={70} height={70} src={"/watermark2.png"} alt="logo" /> */}
            <span className="loading loading-infinity loading-lg text-primary"></span>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {!formList.length && <p className="text-gray-600">There is no form</p>}
          {formList?.map((form, index) => (
            <div key={form.id}>
              <FormListItem
              user={user}
                formRecord={form}
                jsonForm={form.jsonform}
                refreshData={getFormList}
                setRefetch={setRefetch}
                refetch={refetch}
              ></FormListItem>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormList;