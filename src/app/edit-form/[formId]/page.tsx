"use client";

import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_component/FormUi";
import { toast } from "sonner";
import Controller from "../_component/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const [selectedTheme, setSelectedTheme] = useState<string>("light");
  const [selectedBackground, setSelectBackground] = useState<string>("");
  const [selectedStyle, setSelectStyle] = useState({});
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
      // set form id
      setRecordId(result[0].id);
      //set json form
      setJsonForm(JSON.parse(result[0].jsonform));
      //set theme
      setSelectedTheme(result[0]?.theme || "");
      // set background
      setSelectBackground(result[0]?.background || "");
      result[0]?.style && setSelectStyle(JSON.parse(result[0]?.style) || {});
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

  const updateControllerFields = async (value: any, columnName: string) => {
    if (recordId && user) {
      const result = await db
        .update(jsonForms)
        .set({
          [columnName]: value,
        })
        .where(
          and(
            eq(jsonForms.id, recordId),
            eq(jsonForms.createdBy, user.primaryEmailAddress?.emailAddress!)
          )
        );
      toast.success(`${columnName.toUpperCase()} Updated!!!`);
    }
  };
  console.log(selectedStyle);
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        {" "}
        <h2
          onClick={() => router.back()}
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all"
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
          <Link href={`/aiform/${recordId}`} target="_blank">
          <Button className="flex gap-2">
            {" "}
            <SquareArrowOutUpRight className="w-5" /> Live Preview
          </Button>
          </Link>

          <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
            {" "}
            <Share2 className="w-5" /> Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            selectedBackground={selectedBackground}
            setSelectStyle={(value: any) => {
              updateControllerFields(value, "style");
              setSelectStyle(value);
            }}
            setSelectedTheme={(value: any) => {
              updateControllerFields(value, "theme");
              setSelectedTheme(value);
            }}
            setSelectBackground={(value: any) => {
              updateControllerFields(value, "background");

              setSelectBackground(value);
            }}
          />
        </div>
        <div
          style={{ backgroundImage: selectedBackground }}
          className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center  min-h-screen"
        >
          <FormUi
            selectedStyle={selectedStyle}
            selectedTheme={selectedTheme}
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
