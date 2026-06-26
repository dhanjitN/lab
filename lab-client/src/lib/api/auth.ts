import { apiClient } from "./client";
import { getDoctors } from "./doctors";

interface User {
  username: string;
  password: string;
}

export const login = async (user: User) => {
  const res = await apiClient.post("/auth/login", user);
  return res.data;
};



