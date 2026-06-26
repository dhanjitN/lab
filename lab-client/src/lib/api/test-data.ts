import { apiClient } from "./client";

interface TestData {
  statusCode: string;
  data: {},
  message: string;
  success: boolean;
}

export const getData = async () => {
  const res: TestData = await apiClient.get("/data");
  return res.data;
};


