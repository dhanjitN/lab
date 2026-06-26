import { apiClient } from "./client";

export const getDoctors = async () => {
    const res = await apiClient.get(`/doctor`);
    return res.data;
};


