"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { apiClient } from "../api/client";
import { toast } from "sonner";
import { useReportStore } from "../hooks/use-report-store";

export function LoginRedirect() {
  const { setLabName } = useReportStore();
  const router = useRouter();
  const pathname = usePathname();
  const onLoginPage = pathname === "/login";

  useEffect(() => {
    if (!onLoginPage) {
      const checkToken = async () => {
        try {
          const res = await apiClient.post("/auth/verify");
          if (res.data.success) {
            // toast.success("User Verified!");
            const labName = res.data.data.username || "labName";
            setLabName(labName);
          }
        } catch (error: any) {
          toast.error("Please Login !");
          router.push("/login");
        }
      };
      checkToken();
    }
  }, [pathname]);

  return null;
}
