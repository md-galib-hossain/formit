import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Share2, Trash2 } from "lucide-react";
import Link from "next/link";
import { RWebShare } from "react-web-share";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { TFormItem } from "./FormList";
import { TJsonForm } from "@/app/edit-form/[formId]/page";
import { toast } from "sonner";

interface FormListItemProps {
  user: any;
  jsonForm: TJsonForm;
  formRecord: TFormItem;
  refreshData: () => void;
  setRefetch: any;
  refetch: boolean;
}

const FormListItem: React.FC<FormListItemProps> = ({
  user,
  jsonForm,
  formRecord,
  refreshData,
  setRefetch,
  refetch,
}) => {
  const onDeleteForm = async () => {
    if (user) {
      try {
        const response = await fetch(`/api/forms/delete/${formRecord.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }), 
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete form");
        }
  
        const result = await response.json();
        toast.success(result.message);
  
        setRefetch(!refetch);
        refreshData();
      } catch (error) {
        console.error("Error while deleting", error);
        toast.error("Failed to delete form. Please try again.");
      }
    }
  };
  

  return (
    <div className="border shadow-sm rounded-lg p-4 flex flex-col justify-between min-h-[200px]">
      <div>
        <div className="flex justify-between items-start">
          <div></div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash2 className="hover:scale-105 transition-all h-5 w-5 cursor-pointer text-red-500" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  form & it's responses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteForm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <h2 className="text-lg text-black truncate font-semibold" title={jsonForm.formTitle}>
          {jsonForm.formTitle}
        </h2>
        <h3 className="text-sm text-gray-500">{jsonForm.formSubHeading}</h3>
      </div>
      <div>
        <hr className="my-3" />
        <div className="flex items-center justify-between gap-2">
          <RWebShare
            data={{
              text: `${jsonForm.formSubHeading} , Build Your Form In Seconds With Formit AI`,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/aiform/${formRecord.id}`,
              title: jsonForm.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button variant="outline" size="sm" className="flex gap-2">
              <Share2 className="h-5 w-5" />
              Share
            </Button>
          </RWebShare>
          <Link href={`/edit-form/${formRecord.id}`} target="_blank">
            <Button className="flex gap-2" size="sm">
              <Edit2 className="h-5 w-5" />
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormListItem;
