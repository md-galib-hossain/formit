import { TJsonForm } from "@/app/edit-form/[formId]/page";
import { TFormItem } from "./FormList";
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
import { jsonForms } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@/configs";
import { toast } from "sonner";

const FormListItem = ({
  formRecord,
  jsonForm,
  refreshData,
}: {
  jsonForm: TJsonForm;
  formRecord: any;
  refreshData: any;
}) => {
  const { user } = useUser();

  const onDeleteForm = async () => {
    if (user) {
      try {
        const result = await db
          .delete(jsonForms)
          .where(
            and(
              eq(jsonForms.id, formRecord.id!),
              eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress!)
            )
          );

        if (result) {
          toast.success("Form Deleted!");
          refreshData();
        }
      } catch (err: any) {
        console.log(err, "Error while deleting");
      }
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 flex flex-col justify-between min-h-[200px]">
     <div>
     <div className="flex justify-between">
        {/* Alert dialog start */}
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
                form.
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
        {/* Alert dialog end */}
      </div>
      <h2 className="text-lg text-black">{jsonForm.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonForm.formSubHeading}</h2>
     </div>
    <div>
    <hr className="my-3" />
      <div className="flex justify-between">
       
       <div>

        <RWebShare
        data={{
          text: jsonForm.formSubHeading+" , Build Your Form In Second With Formit Ai",
          url: process.env.NEXT_PUBLIC_BASE_URL!+"/aiform/"+formRecord.id!,
          title: jsonForm.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
       <Button variant="outline" size="sm" className="flex gap-2">
          <Share2 className="h-5 w-5" />
          Share
        </Button>
      </RWebShare>
       </div>
        <Link href={`/edit-form/${formRecord?.id}`} target="_blank">
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
