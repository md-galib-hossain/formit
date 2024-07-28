"use client";

import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import FormUi from "../_component/FormUi";

type FormFieldOption = {
  value: string;
  label: string;
};

type FormField = {
  fieldName: string;
  fieldLabel: string;
  fieldType:
    | "text"
    | "email"
    | "number"
    | "select"
    | "radio"
    | "textarea"
    | "checkbox";
  fieldPlaceholder?: string;
  fieldRequired: boolean;
  fieldOptions?: FormFieldOption[];
};

export type TJsonForm = {
  formTitle: string;
  formSubHeading: string;
  formFields: FormField[];
};

const EditForm = ({ params }: any) => {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState<TJsonForm | null>(null);
  const router = useRouter();
  const [recordId,setRecordId]=useState(0)
  useEffect(() => {
    user && getFormdata();
  }, [user]);

  const getFormdata = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(
        and(
          eq(jsonForms.id, params?.formId!),
          eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress!)
        )
      );
      setRecordId(result[0].id)
    setJsonForm(JSON.parse(result[0].jsonform));
  };



  const onFieldUpdate = async (value: any, index: any) => {
    if (jsonForm) {
      const updatedFormFields = [...jsonForm.formFields];
      updatedFormFields[index].fieldLabel = value.fieldLabel;
      updatedFormFields[index].fieldPlaceholder = value.fieldPlaceholder;

      setJsonForm({
        ...jsonForm,
        formFields: updatedFormFields,
      });

      const result = await db.update(jsonForms).set({ jsonform: JSON.stringify(jsonForm)}).where(and( eq(jsonForms.id,recordId), eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress!)))
    console.log(result)
    }
  };
  console.log(jsonForm);
  return (
    <div className="p-10">
      <h2
        onClick={() => router.back()}
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all"
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center">
          {" "}
          <FormUi onFieldUpdate={onFieldUpdate} jsonForm={jsonForm} />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
