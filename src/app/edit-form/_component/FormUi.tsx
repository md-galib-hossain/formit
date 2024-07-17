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

const FormUi = ({ jsonForm }) => {
  console.log(jsonForm);
  return (
    <div className="border p-5 md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">{jsonForm.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm.formSubHeading}
      </h2>

      {jsonForm?.formFields?.map((field, index) => (
        <div key={index}>
          {field.fieldType === "select" ? (
            <div className="my-3">
              <Label className="text-xs text-gray-500">{field.fieldLabel}</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.fieldPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.fieldOptions.map((option, optIndex) => (
                    <SelectItem key={optIndex} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === "radio" ? (
            <div className="my-3">
              <Label className="text-xs text-gray-500">{field.fieldLabel}</Label>
              <RadioGroup>
                {field.fieldOptions.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="my-3">
              <Label className="text-xs text-gray-500">{field.fieldLabel}</Label>
              <Input
                type={field.fieldType}
                placeholder={field.fieldPlaceholder}
                name={field.fieldName}
                required={field.fieldRequired}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormUi;
