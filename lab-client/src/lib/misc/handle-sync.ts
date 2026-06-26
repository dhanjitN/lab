import { apiClient } from "../api/client";
import { bulkReports } from "@/dexie/dexieClient";
import { toast } from "sonner";
export const handleSync = async () => {
    try {
        console.log("Staring Sync..");
        const res = await apiClient("/reports");
        console.log(res.data.data.reports);
        if (res.data) {
            await bulkReports(res.data.data.reports);
            // toast.success("Sync Successfull");
        }
    } catch (error) {
        console.log("ERR1", error);
        try {
            const res = await apiClient.post("/reports");
            console.log(res.data);
        } catch (error) {
            console.log("ERR2", error);
        }
    } finally {
    }
}