"use client";
import { TJsonForm } from "@/app/edit-form/[formId]/page";
import FormUi from "@/app/edit-form/_component/FormUi";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { useEffect, useState } from "react";
type TRecord = {
  jsonform: TJsonForm;
  id: number;
  theme: string;
  style: any;
  background: string;
  createdBy: string;
};

const LiveAiForm = ({ params }: any) => {
  const [record, setRecord] = useState<TRecord | null>(null);
  const [jsonForm, setJsonForm] = useState<TJsonForm | null>(null);

  useEffect(() => {
    console.log(params);
    params && getFormData();
  }, [params]);
  const getFormData = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.id, Number(params?.formid)));
    if (result.length > 0) {
      const recordData = result[0];
      const parsedJsonForm: TJsonForm = JSON.parse(recordData.jsonform);
      const record: TRecord = {
        id: recordData.id,
        jsonform: parsedJsonForm,
        theme: recordData.theme || "",
        style: JSON.parse(recordData.style as any) || null,
        background: recordData.background || "",
        createdBy: recordData.createdBy,
      };
      setRecord(record);
      setJsonForm(parsedJsonForm);
      console.log(jsonForm);
      console.log(record);
    }
    console.log(jsonForm);
    console.log(record);
  };
  console.log(record?.background);
  return (
    <div
      className="p-10 flex justify-center items-center"
      style={{ backgroundImage: record?.background }}
    >
      {record ? (
        <>
          <FormUi
            jsonForm={jsonForm}
            selectedStyle={record?.style}
            selectedTheme={record?.theme || ""}
            editable={false}
          />
 
        </>
      ) : (
        <div className="flex items-center min-h-screen">
           <div className="flex flex-col justify-center items-center">
           <Image
                  width={70}
                  height={70}
                  src={"/watermark2.png"}
                  alt="logo"
                />
          <span className="loading loading-infinity loading-lg"></span>
           </div>
        </div>
      )}
    </div>
  );
};

export default LiveAiForm;
