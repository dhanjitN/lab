/* Report Body consists of 
1. Patient Details section 
2. Page (or , pages )
3. save only or  generate pdf
*/
"use client";

import { useEffect } from "react";
import ReportDetail from "./new-report-report-detail";
import FullReportPage from "./pages/full-report-page";
import PatientDetails from "./report-patient-detail";
import { useTestData } from "@/lib/hooks/use-test-data";
import { ReportFooter } from "./pages/report-footer";

export default function NewReportBody() {
  const { fetchData } = useTestData();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="bg-secondary md:px-3 md:py-2 rounded-md"
      suppressHydrationWarning
    >
      {/* {JSON.stringify(pages)} */}
      <ReportDetail />
      <PatientDetails />
      <FullReportPage />
      <ReportFooter />
    </div>
  );
}
