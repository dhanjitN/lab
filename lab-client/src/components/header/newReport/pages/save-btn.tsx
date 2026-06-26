"use client";
import { Button } from "@/components/ui/button";
import { addReport } from "@/dexie/dexieClient";
import { apiClient } from "@/lib/api/client";
import { useReportStore } from "@/lib/hooks/use-report-store";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const SaveBtn = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { patientDetails, reportDetails, pages } = useReportStore();

  /* const { name, age, sex } = patientDetails;
  const { refByDoc, refNo, testDate, reportDate } = reportDetails; */

  const reportObj = {
    referenceNumber: reportDetails.refNo,
    testDate: reportDetails.testDate,
    reportDate: reportDetails.reportDate,
    referenceDoctor: reportDetails.refByDoc,
    patientName: patientDetails.name,
    patientAge: patientDetails.age,
    patientGender: patientDetails.sex,
    reportData: JSON.stringify(pages),
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const res = await apiClient.post("/report", {
        ...reportObj,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        await addReport(res.data.newReport);
      }
      setTimeout(() => {
        toast("Generating PDF");
        router.push("/pdf");
      }, 500);
    } catch (error) {
      toast.error(JSON.stringify(error, null, 2));
    } finally {
      setIsSubmitting(false);
      // console.log("Reached here finally ");
    }
  };

  /* toast.promise(handleSave, {
    loading: "Saving Data..",
    error: "Failed Adding Report",
    success: "Successfully Added Report",
  }); */
  const isEmpty =
    !reportObj.patientName ||
    !reportObj.patientAge ||
    !reportObj.patientGender ||
    !pages[0].categoryName;

  useEffect(() => {
    console.log("Pages", pages[0].categoryName);
  }, [pages]);
  return (
    <div>
      <Button
        disabled={isSubmitting || isEmpty}
        onClick={() => {
          handleSave();
        }}
        className="hover:cursor-pointer"
      >
        {isSubmitting ? "Saving.." : "Save & View "} <Save />
      </Button>
    </div>
  );
};
