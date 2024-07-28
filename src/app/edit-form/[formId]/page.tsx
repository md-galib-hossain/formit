
"use client";

import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_component/FormUi";
import { toast } from "sonner";

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
  const [recordId, setRecordId] = useState<number | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState<number | null>(null);

  useEffect(() => {
    if (user) getFormdata();
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
    if (result.length > 0) {
      setRecordId(result[0].id);
      setJsonForm(JSON.parse(result[0].jsonform));
    }
  };

  const updateJsonFormInDb = async (updatedJsonForm: TJsonForm) => {
    if (recordId && user) {
      await db
        .update(jsonForms)
        .set({ jsonform: JSON.stringify(updatedJsonForm) })
        .where(
          and(
            eq(jsonForms.id, recordId),
            eq(jsonForms.createdBy, user.primaryEmailAddress?.emailAddress!)
          )
        );
      toast.success("Updated!!!");
    }
  };

  useEffect(() => {
    if (updateTrigger) {
      updateJsonFormInDb(jsonForm!);
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value: any, index: number) => {
    setJsonForm((prevJsonForm) => {
      if (prevJsonForm) {
        const updatedFormFields = [...prevJsonForm.formFields];
        updatedFormFields[index].fieldLabel = value.fieldLabel;
        updatedFormFields[index].fieldPlaceholder = value.fieldPlaceholder;
        setUpdateTrigger(Date.now());
        return {
          ...prevJsonForm,
          formFields: updatedFormFields,
        };
      }
      return prevJsonForm;
    });
  };

  const deleteField = (indexToRemove: number) => {
    setJsonForm((prevJsonForm) => {
      if (prevJsonForm) {
        const updatedFormFields = prevJsonForm.formFields.filter(
          (_, index) => index !== indexToRemove
        );
        setUpdateTrigger(Date.now());
        return {
          ...prevJsonForm,
          formFields: updatedFormFields,
        };
      }
      return prevJsonForm;
    });
  };

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
          <FormUi
            onFieldUpdate={onFieldUpdate}
            jsonForm={jsonForm}
            deleteField={(index: any) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
