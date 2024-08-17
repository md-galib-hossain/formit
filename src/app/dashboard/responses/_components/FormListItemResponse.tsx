import { TRecord } from "@/app/aiform/[formid]/page";
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { count, eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import React, { useEffect, useState, useCallback } from "react";

interface FormListItemResponseProps {
  jsonForm: string;
  formRecord: TRecord;
}

const FormListItemResponse: React.FC<FormListItemResponseProps> = ({
  jsonForm,
  formRecord,
}) => {
  const [responseCount, setResponseCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  let jsonData: any[] = [];

  useEffect(() => {
    if (formRecord) {
      getResponseCount();
    }
  }, [jsonForm, formRecord]);

  const getResponseCount = useCallback(async () => {
    setDataLoad(true);
    try {
      const res = await db
        .select({ value: count() })
        .from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id!));
      setResponseCount(res[0].value);
    } catch (err) {
      console.error("Error fetching response count", err);
    } finally {
      setDataLoad(false);
    }
  }, [formRecord]);

  const exportData = async () => {
    setLoading(true);
    try {
      const res = await db
        .select()
        .from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id));
      if (res) {
        jsonData = res.map((item) => JSON.parse(item.jsonResponse));
        exportToExcel(jsonData);
      }
    } catch (err) {
      console.error("Error exporting data", err);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = (jsonData: any) => {
    const workSheet = XLSX.utils.json_to_sheet(jsonData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
    XLSX.writeFile(workBook, `${formRecord.jsonform?.formTitle}.xlsx`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 my-5 flex flex-col justify-between">
      <div>
        <h2 className="text-lg text-black truncate font-semibold" title={formRecord?.jsonform?.formTitle}>
          {formRecord.jsonform?.formTitle}
        </h2>
        <h3 className="text-sm text-gray-500">
          {formRecord.jsonform?.formSubHeading}
        </h3>
      </div>
      <div>
        <hr className="my-3" />
        <div className="flex  justify-between items-center">
          <h2 className="text-sm">
            <strong>{responseCount}</strong>{" "}
            {responseCount > 1 ? "Responses" : "Response"}
          </h2>
          <Button
            disabled={loading}
            onClick={exportData}
            size="sm"
            aria-label={loading ? "Exporting Data" : "Export Data"}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span className="sr-only">Loading...</span>
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
