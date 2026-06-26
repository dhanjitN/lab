"use client";

import dynamic from "next/dynamic";
import { ReportPdf } from "@/components/pdf/report-headless";
import { useReportStore } from "@/lib/hooks/use-report-store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Dynamic imports for both
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default function PdfPage() {
  const [keyCounter, setKeyCounter] = useState(0);
  const { patientDetails, reportDetails, pages } = useReportStore();

  useEffect(() => {
    setKeyCounter((prev) => prev + 1);
  }, [reportDetails, patientDetails, pages]);

  const fileName = `${reportDetails?.refNo || "report"}-${
    patientDetails?.name || "patient"
  }.pdf`;

  return (
    <div
      className="
      pt-5
        absolute top-[5rem] sm:top-[5rem] left-0 w-full 
        h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-5rem)]
        bg-neutral-100 dark:bg-neutral-900 
        flex flex-col items-center 
        overflow-hidden
        inset-0
      "
    >
      {/* Toolbar */}
      <div className="z-40 w-full bg-neutral-900/80 backdrop-blur-md py-3 flex justify-center border-b border-neutral-800">
        <PDFDownloadLink document={<ReportPdf />} fileName={fileName}>
          {({ loading }) => (
            <Button
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white 
              rounded-md hover:cursor-pointer px-5 py-2 shadow-md transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Preparing..." : "Download PDF"}
              <Download size={18} />
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full flex justify-center items-center px-4 py-6 overflow-hidden">
        <div className="w-full max-w-6xl h-full bg-white dark:bg-neutral-800 shadow-2xl rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <PDFViewer key={keyCounter} width="100%" height="100%">
            <ReportPdf key={keyCounter} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}
