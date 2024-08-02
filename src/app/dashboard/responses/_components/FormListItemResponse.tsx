import { TRecord } from "@/app/aiform/[formid]/page";
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { count, eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";

const FormListItemResponse = ({
  jsonForm,
  formRecord,
}: {
  jsonForm: string;
  formRecord: TRecord;
}) => {
  const [responseCount, setResponseCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  let jsonData: any = [];
  useEffect(() => {
    if (jsonData && formRecord) {
      getResponseCount();
    }
  }, [jsonForm, formRecord]);

  const exportData = async () => {
    setLoading(true);
    try {
      const res = await db
        .select()
        .from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id));
      if (res) {
        res.forEach((item) => {
          const jsonItem = JSON.parse(item.jsonResponse);
          jsonData.push(jsonItem);
        });
        exportToExcel(jsonData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  // Convert Json to excel and then download
  const exportToExcel = async (jsonData: any) => {
    const workSheet = XLSX.utils.json_to_sheet(jsonData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
    XLSX.writeFile(workBook, formRecord?.jsonform?.formTitle + ".xlsx");
  };

  const getResponseCount = async () => {
    setDataLoad(true);
    try {
      const res = await db
        .select({ value: count() })
        .from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id!));
      setResponseCount(res[0].value);
      console.log(res);
    } catch (err: any) {
      console.log(err);
    } finally {
      setDataLoad(false);
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 my-5 flex flex-col justify-between">
      <div>
        <h2 className="text-lg text-black">
          {formRecord?.jsonform?.formTitle}
        </h2>
        <h2 className="text-sm text-gray-500">
          {formRecord?.jsonform?.formSubHeading}
        </h2>
      </div>
      <div>
        <hr className="my-3" />
        <div className="flex justify-between items-center">
          <h2 className="text-sm">
            <strong>{responseCount}</strong>
            {responseCount > 1 ? " Responses" : " Response"}
          </h2>
          <Button
            disabled={loading}
            onClick={() => exportData()}
            className=""
            size="sm"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin absolute" />
                <span className="opacity-0">Export</span>
              </>
            ) : (
              "Export"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormListItemResponse;
