// components/pdf/DownloadReportButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download, Eye, HardDriveDownload, View } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DownloadReportButton() {
  const router = useRouter();

  const handleClick = () => {
    toast("Generating PDF....");
    router.push("/pdf");
  };
  return (
    <Button className="hover:cursor-pointer" onClick={handleClick}>
      View Report <Eye />{" "}
    </Button>
  );
}
