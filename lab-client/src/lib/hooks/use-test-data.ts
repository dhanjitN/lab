"use client";

import { apiClient } from "../api/client";
import { useReportStore } from "./use-report-store";


export function useTestData() {
  const { setTestData } = useReportStore();
  const fetchData = async () => {
    try {
      const response = await apiClient.get("/data");
      if (response.data) {
        setTestData(response?.data.data);
        console.log("Fetched Test Data");
      }
    } catch (error: any) {
      console.log(error.message)
      // toast.error(JSON.stringify(error));
    }
  };

  return { fetchData };
}
