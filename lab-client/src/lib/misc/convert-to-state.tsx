"use client";
import { Report } from "@/dexie/dexie.db";
import {
  PageData,
  ReportStore,
  useReportStore,
} from "../hooks/use-report-store";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useRouter } from "next/navigation";

export function ConvertToState({
  idbReport,
  disableBtn = false,
}: {
  idbReport: Report;
  disableBtn?: boolean;
}) {
  const router = useRouter();
  const { updateReportDetail, updatePatientDetail, updateState } =
    useReportStore();

  const {
    patientAge,
    patientGender,
    patientName,
    reportData,
    testDate,
    reportDate,
    referenceDoctor,
    referenceNumber,
  } = idbReport;

  const reportDetails: Partial<ReportStore["reportDetails"]> = {
    refNo: referenceNumber,
    refByDoc: referenceDoctor,
    reportDate: new Date(reportDate),
    testDate: new Date(testDate),
  };

  const patientDetails: Partial<ReportStore["patientDetails"]> = {
    name: patientName,
    age: patientAge,
    sex: patientGender,
  };

  const handleClick = () => {
    const parsedReportData: PageData[] = JSON.parse(reportData);
    updatePatientDetail(patientDetails);
    updateReportDetail(reportDetails);
    updateState(parsedReportData);

    console.log("Report Data", patientDetails, reportDetails, parsedReportData);

    setTimeout(() => {
      router.push("/pdf");
    }, 1000);
  };

  return (
    <div className="w-32 flex items-center justify-center">
      <Button
        variant="outline"
        className="hover:cursor-pointer hover:shadow-xl"
        disabled={disableBtn}
        onClick={handleClick}
      >
        <Printer />
      </Button>
    </div>
  );
}
