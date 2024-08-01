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
import FieldEdit from "./FieldEdit";
import { TJsonForm } from "../[formId]/page";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { db } from "@/configs";
import moment from "moment";
import { userResponses } from "@/configs/schema";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

type TFormData = {
  [key: string]: any;
};

const FormUi = ({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedStyle,
  editable = true,
  createdBy='anonymous',
  formId = 0
}: {
  jsonForm: TJsonForm | null;
  onFieldUpdate?: any;
  deleteField?: any;
  selectedTheme: string | "";
  selectedStyle: any;
  editable?: boolean;
  createdBy?: string;
  formId? :number
}) => {
  const [formData, setFormData] = useState<TFormData>({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckBoxChange = (fieldName: string, itemName: string, value: boolean) => {
    const list = formData?.[fieldName] ? formData[fieldName] : [];
    if (value) {
      list.push(itemName);
    } else {
      const index = list.indexOf(itemName);
      if (index > -1) {
        list.splice(index, 1);
      }
    }
    setFormData({
      ...formData,
      [fieldName]: list,
    });
    console.log(formData);
  };

  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    console.log(formData);
    const result = await db.insert(userResponses).values({
      jsonResponse: JSON.stringify(formData),
      createdDate: moment().format('DD/MM/yyyy'),
      createdBy: createdBy,formRef : formId
    });
    console.log(result);
    if (result.rowCount > 0) {
      formRef.current?.reset();
      toast.success('Response Submitted Successfully');
      setLoading(false);
    } else {
      toast.error('Error While Saving the Form');
    }
  };

  console.log(jsonForm);
  return (
    <>
      {jsonForm ? (
        <form
          ref={formRef}
          onSubmit={onFormSubmit}
          className="border p-5 md:w-[600px] rounded-lg"
          data-theme={selectedTheme}
          style={{
            boxShadow:
              selectedStyle?.key === "boxshadow" ? selectedStyle?.value : "",
            border: selectedStyle?.key === "border" && selectedStyle.value,
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
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(field?.fieldName, value)
                    }
                    required={field?.fieldRequired}
                  >
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
                  <RadioGroup required={field?.fieldRequired}>
                    {field?.fieldOptions?.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={() =>
                            handleSelectChange(field?.fieldName, option.label)
                          }
                          value={option.value}
                          id={option.value}
                        />
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
                  {field?.fieldOptions && field?.fieldOptions?.length > 0 ? (
                    field?.fieldOptions?.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Checkbox
                          onCheckedChange={(value) =>
                            handleCheckBoxChange(
                              field.fieldName,
                              item.label,
                              value as boolean
                            )
                          }
                        />
                        <h2>{item.label}</h2>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        onCheckedChange={(value) =>
                          handleCheckBoxChange(
                            field.fieldName,
                            field?.fieldLabel,
                            value as boolean
                          )
                        }
                        required={field.fieldRequired}
                      />
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
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              )}
              {editable ? (
                <div>
                  <FieldEdit
                    defaultValue={field}
                    onUpdate={(value: any) => onFieldUpdate(value, index)}
                    deleteField={() => deleteField(index)}
                  />
                </div>
              ) : null}
            </div>
          ))}
          <div
            className={`flex ${
              editable ? "justify-end" : "justify-between gap-2"
            }`}
          >
            {editable || (
              <Link
                href="/"
                target="_blank"
                className="font-semibold flex gap-2 items-center "
              >
                <Image
                  width={30}
                  height={30}
                  src={"/watermark2.png"}
                  alt="logo"
                />
                Build Your own Form With Formit Ai
              </Link>
            )}

            <button disabled={loading} type="submit" className="btn btn-primary rounded-md relative flex items-center justify-center">
              {loading ? (
                <>
                  <Loader2 className="animate-spin absolute" />
                  <span className="opacity-0">Submit</span>
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      ) : <div className="flex items-center min-h-screen">
      <div className="flex flex-col justify-center items-center">
        {/* <Image width={70} height={70} src={"/watermark2.png"} alt="logo" /> */}
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    </div>}
    </>
  );
};

export default FormUi;
