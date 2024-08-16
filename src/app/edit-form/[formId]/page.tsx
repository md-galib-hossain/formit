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
import { RWebShare } from "react-web-share";
import { TRecord } from "@/app/aiform/[formid]/page";

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
  const [record, setRecord] = useState<TRecord | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState<string>("light");
  const [selectedBackground, setSelectBackground] = useState<string>("");
  const [selectedStyle, setSelectStyle] = useState({});
  
  useEffect(() => {
    if (user) getFormdata();
  }, [params.formid,user]);

  const getFormdata = async () => {
    setLoading(true);
    try {
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
        // set record
        const recordData = result[0];
        const parsedJsonForm: TJsonForm = JSON.parse(recordData?.jsonform);
        const record: TRecord = {
          id: recordData?.id,
          jsonform: parsedJsonForm,
          theme: recordData?.theme || "",
          style: JSON.parse(recordData?.style as any) || null,
          background: recordData?.background || "",
          createdBy: recordData?.createdBy,
          createdAt: recordData?.createdDate,
          enableSignIn: recordData?.enableSignIn! || false
        };
        setRecord(record);
        // set json form
        setJsonForm(parsedJsonForm);
        // set theme
        setSelectedTheme(record?.theme);
        // set background
        setSelectBackground(record?.background);
        record?.style && setSelectStyle(record.style);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateJsonFormInDb = async (updatedJsonForm: TJsonForm) => {
    if (record && user) {
      // setLoading(true);
      try {
        await db
          .update(jsonForms)
          .set({ jsonform: JSON.stringify(updatedJsonForm) })
          .where(
            and(
              eq(jsonForms.id, record.id),
              eq(jsonForms.createdBy, user.primaryEmailAddress?.emailAddress!)
            )
          );
        toast.success("Updated!!!");
      } catch (error) {
        console.error("Error updating form data:", error);
        toast.error("Failed to update form data.");
      }
      //  finally {
      //   setLoading(false);
      // }
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
    if (record && user) {
      // setLoading(true);
      try {
        await db
          .update(jsonForms)
          .set({ [columnName]: value })
          .where(
            and(
              eq(jsonForms.id, record.id),
              eq(jsonForms.createdBy, user.primaryEmailAddress?.emailAddress!)
            )
          );
        toast.success(`${columnName.toUpperCase()} Updated!!!`);
      } catch (error) {
        console.error(`Error updating ${columnName}:`, error);
        toast.error(`Failed to update ${columnName}.`);
      } finally {
        // setLoading(false);
      }
    }
  };

  console.log(record);

  return (
    <div className="p-10">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col justify-center items-center">
          {/* <Image width={70} height={70} src={"/watermark2.png"} alt="logo" /> */}
          <span className="loading loading-infinity loading-lg text-primary"></span>
        
        </div>
      </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2
              onClick={() => router.back()}
              className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all"
            >
              <ArrowLeft /> Back
            </h2>
            <div className="flex gap-2">
              <Link href={`/aiform/${params.formId}`} target="_blank">
                <Button className="flex gap-2">
                  <SquareArrowOutUpRight className="w-5" /> Live Preview
                </Button>
              </Link>
              <RWebShare
                data={{
                  text: record?.jsonform?.formSubHeading + " , Build Your Form In Second With Formit Ai",
                  url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + record?.id,
                  title: record?.jsonform.formTitle ,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
                  <Share2 className="w-5" /> Share
                </Button>
              </RWebShare>
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
                setSignInEnable={(value:any)=>{
                  updateControllerFields(value,'enableSignIn')
                }}
                enableSignInCheckbox={record?.enableSignIn}
              />
            </div>
            <div
              style={{ backgroundImage: selectedBackground }}
              className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center min-h-screen"
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
        </>
      )}
    </div>
  );
};

export default EditForm;
