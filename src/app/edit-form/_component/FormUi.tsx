import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import FieldEdit from "./FieldEdit";
import { TJsonForm } from "../[formId]/page";

const FormUi = ({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,selectedStyle
}: {
  jsonForm: TJsonForm | null;
  onFieldUpdate: any;
  deleteField: any;
  selectedTheme: string | null;
  selectedStyle:any
}) => {
  console.log(selectedStyle)
  return (
    <>
      {jsonForm ? (
        <div
          className="border p-5 md:w-[600px] rounded-lg"
          data-theme={selectedTheme}
          style={{
            boxShadow: selectedStyle?.key=='boxshadow'? selectedStyle?.value : "",
            border:selectedStyle?.key=='border'&&selectedStyle.value
          }}
        >
          <h2 className="font-bold text-center text-2xl">
            {jsonForm.formTitle}
          </h2>
          <h2 className="text-sm text-gray-400 text-center">
            {jsonForm.formSubHeading}
          </h2>

          {jsonForm?.formFields?.map((field, index) => (
            <div key={index} className="flex items-center gap-2 my-3">
              {field.fieldType === "select" ? (
                <div className="w-full">
                  <Label className="text-xs text-gray-500">
                    {field.fieldLabel}
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder={field.fieldPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field?.fieldOptions?.map((option, optIndex) => (
                        <SelectItem key={optIndex} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : field.fieldType === "radio" ? (
                <div className="w-full">
                  <Label className="text-xs text-gray-500">
                    {field.fieldLabel}
                  </Label>
                  <RadioGroup>
                    {field?.fieldOptions?.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : field?.fieldType === "checkbox" ? (
                <div className="w-full">
                  <Label className="text-xs text-gray-500">
                    {field?.fieldLabel}
                  </Label>
                  {field?.fieldOptions ? (
                    field?.fieldOptions?.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Checkbox />
                        <h2>{item.label}</h2>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Checkbox />
                      <h2>{field?.fieldLabel}</h2>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full">
                  <Label className="text-xs text-gray-500">
                    {field.fieldLabel}
                  </Label>
                  <Input
                    className="bg-transparent"
                    type={field.fieldType}
                    placeholder={field.fieldPlaceholder}
                    name={field.fieldName}
                    required={field.fieldRequired}
                  />
                </div>
              )}
              <div>
                <FieldEdit
                  defaultValue={field}
                  onUpdate={(value: any) => onFieldUpdate(value, index)}
                  deleteField={() => deleteField(index)}
                />
              </div>
            </div>
          ))}
          <button className={`btn btn-primary rounded-md`}>Submit</button>
        </div>
      ) : null}
    </>
  );
};

export default FormUi;
