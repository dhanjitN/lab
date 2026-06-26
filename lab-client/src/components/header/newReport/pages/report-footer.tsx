"use client";

import { Button } from "@/components/ui/button";
import { Download, SaveIcon } from "lucide-react";

import DownloadReportButton from "./download-btn";
import { SaveBtn } from "./save-btn";
import { AddReportBtn } from "./add-report-btn";

export const ReportFooter = () => {
  return (
    <div className="w-full flex items-center justify-center gap-3 border-t-2 border-orange-50 mx-auto pt-3 mb-3">
      {/* <DownloadReportButton /> */}
      <SaveBtn />
      {/* <AddReportBtn /> */}
    </div>
  );
};
