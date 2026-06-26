"use client";
import { TypoH1 } from "@/components/Typography/typo-h1";
import NewReport from "@/components/header/newReport/new-report";
import { handleSync } from "@/lib/misc/handle-sync";
import { useEffect } from "react";
import { getDoctors } from "@/lib/api/doctors";
import { useReportStore } from "@/lib/hooks/use-report-store";
export default function Home() {
  const { setDoctors, doctors } = useReportStore();
  useEffect(() => {
    handleSync();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();
        const docs = res.data.doctors || [];
        setDoctors(docs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className=" pt-5  md:mx-5 mx-0 ">
      <NewReport />
    </div>
  );
}
