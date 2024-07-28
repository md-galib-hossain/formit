import { Edit, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog"

const FieldEdit = ({defaultValue,onUpdate,deleteField} : any) => {
  const [label, setLabel] = useState(defaultValue.fieldLabel);
  const [placeholder, setPlaceholder] = useState(defaultValue.fieldPlaceholder);
 console.log(defaultValue)
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          {" "}
          <Edit className="h-5 w-5 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2 className="mb-4 text-lg font-semibold">Edit fields</h2>
         <div className="flex flex-col gap-2 ">
         <div>
            <Label> Label name</Label>
            <Input
              type="text"
              defaultValue={defaultValue.fieldLabel}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <Label> Placeholder name</Label>
            <Input
              type="text"
              defaultValue={defaultValue.fieldPlaceholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
         </div>
          <Button className="mt-3" size="sm" onClick={()=> onUpdate({
            fieldPlaceholder : placeholder, fieldLabel: label
          })}>Update</Button>
        </PopoverContent>
      </Popover>
      <AlertDialog>
  <AlertDialogTrigger>      <Trash className="h-5 w-5 text-red-500" />
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone, will permanently delete your Field
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=> deleteField()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

   
    </div>
  );
};

export default FieldEdit;
