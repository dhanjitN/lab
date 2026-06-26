import { Button } from "@/components/ui/button";
import { addReport, bulkAddReports } from "@/dexie/dexieClient";
import { db, Report } from "@/dexie/dexie.db";
import { Plus } from "lucide-react";
import { apiClient } from "@/lib/api/client";

export const AddReportBtn = () => {
  const getReports = async () => {
    try {
      const res = await apiClient.get("/reports");
      return res.data.data.reports || [];
    } catch (error: any) {
      console.log("Error Occured");
      return [];
    }
  };
  const handleClick = async () => {
    try {
      const data = await getReports();
      await bulkAddReports(data);
      console.log("Reports added successfully!");
    } catch (error) {
      console.error("Error adding reports:", error);
    }
  };
  return (
    <div>
      <Button onClick={handleClick}>
        {" "}
        <Plus /> Add Report{" "}
      </Button>
    </div>
  );
};
