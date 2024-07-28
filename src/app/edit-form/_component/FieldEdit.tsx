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

const FieldEdit = ({defaultValue,onUpdate} : any) => {
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
      <Trash className="h-5 w-5 text-red-500" />
    </div>
  );
};

export default FieldEdit;
