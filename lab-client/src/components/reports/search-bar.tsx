"use client";
import { Rotate3d, RotateCcw, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CustomTooltip } from "../selfMade/custom-tooltip";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { bulkReports } from "@/dexie/dexieClient";
import { toast } from "sonner";
import { useReportStore } from "@/lib/hooks/use-report-store";

export const SearchBar = () => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const { setSearchInput, searchInput } = useReportStore();
  const handleSync = async () => {
    try {
      console.log("Staring Sync..");
      setIsSyncing(true);
      const res = await apiClient("/reports");
      console.log(res.data.data.reports);
      if (res.data) {
        await bulkReports(res.data.data.reports);
        toast.success("Sync Successfull");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className=" self-center flex md:py-2 md:px-3 rounded-md bg-secondary shadow-sm w-full max-w-md justify-center items-center gap-2 z-50">
      <div>
        <SearchIcon />
      </div>
      <div className="w-full">
        <Input
          type="text"
          onChange={(e) => {
            const text = e.target.value;
            if (text) {
              setSearchInput(text);
            }
          }}
          placeholder="Patient Name , Ref No "
        />
      </div>
      <div
        onClick={() => handleSync()}
        className="hover:shadow hover:cursor-pointer"
      >
        <CustomTooltip Element={<RotateCcw />} tooltip="Sync Reports" />
      </div>
    </div>
  );
};
