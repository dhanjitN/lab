"use client";
import { getReports } from "@/dexie/dexieClient";
import { Report } from "@/dexie/dexie.db";
import { useEffect, useReducer, useState } from "react";
import { toast } from "sonner";
import { ConvertToState } from "@/lib/misc/convert-to-state";
import { useRouter } from "next/navigation";
import { useReportStore } from "@/lib/hooks/use-report-store";
import { Cross, MoveDown, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { apiClient } from "@/lib/api/client";
import { useLiveQuery } from "dexie-react-hooks";
import { handleSync } from "@/lib/misc/handle-sync";

// Alert Dialog

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SearchItem = (reportData: Report) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await apiClient.delete(`/report/client/${reportData._id}`);
      if (res.data.success) {
        toast.success(
          `Successfully Deleted  Report : ${reportData.referenceNumber}`
        );
      }
      handleSync();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const {
    referenceNumber,
    patientAge,
    patientGender,
    patientName,
    reportDate,
  } = reportData;
  const rDate = new Date(reportDate);
  return (
    <div className="flex justify-between  items-center px-5 py-4 border rounded-md my-1 mx-1  ">
      {/* <p>id : {_id}</p> */}
      <p className="w-52">{referenceNumber}</p>
      <h2 className="w-52"> {patientName}</h2>
      <p className="w-32"> {patientAge} </p>
      <p className="w-32"> {patientGender}</p>
      <p className="w-32"> {rDate.toLocaleDateString()}</p>
      <ConvertToState idbReport={reportData} />
      <p className="w-32 flex justify-center items-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"outline"}
              className="hover:cursor-pointer hover:shadow-xl"
              disabled={isDeleting}
            >
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the report{" "}
                <strong>{referenceNumber}</strong>? <br />
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive hover:bg-destructive/90 hover:cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </p>
    </div>
  );
};

const SearchItemDeleted = (reportData: Report) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await apiClient.delete(`/report/client/${reportData._id}`);
      if (res.data.success) {
        toast.success(
          `Successfully Deleted  Report : ${reportData.referenceNumber}`
        );
      }
      handleSync();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const { referenceNumber, patientAge, patientGender, patientName, updatedAt } =
    reportData;
  const updatedTime = new Date(updatedAt);
  return (
    <div className="flex justify-between bg-muted opacity-55 cursor-not-allowed select-none pointer-events-none items-center px-5 py-4 border rounded-md my-1 mx-1 z-10 ">
      {/* <p>id : {_id}</p> */}
      <p className="w-52">{referenceNumber}</p>
      <h2 className="w-52"> {patientName}</h2>
      <p className="w-32"> {patientAge} </p>
      <p className="w-32"> {patientGender}</p>
      <p className="w-32">
        {updatedTime.toLocaleDateString()} {"\n"}{" "}
        {updatedTime.toLocaleTimeString()}
      </p>

      <ConvertToState idbReport={reportData} disableBtn={true} />

      <p className="w-32 flex justify-center items-center">
        <Button
          variant={"outline"}
          className="hover:cursor-pointer hover:shadow-xl"
          onClick={handleDelete}
          disabled={true}
        >
          <Trash2 />
        </Button>
      </p>
    </div>
  );
};

// const patientsData = await getReports();

export const SearchResults = () => {
  const [patientsData, setPatientsData] = useState<Report[] | []>([]);

  const { searchInput } = useReportStore();
  useEffect(() => {
    const loadReports = async () => {
      const reports = await getReports();
      const sortedReports = reports.sort((a, b) => {
        const numA = parseInt(a.referenceNumber.split("-")[1], 10);
        const numB = parseInt(a.referenceNumber.split("-")[1], 10);
        return numB - numA;
      });
      // const nonDeletedReports = sortedReports.filter((r) => r.deleted !== true);

      setPatientsData(sortedReports);
    };
    loadReports();
  }, [patientsData]);
  if (patientsData.length === 0) {
    return (
      <div className="h-[80vh] overflow-y-scroll bg-muted rounded-md">
        <div className="text-center pt-3 pb-5">
          <h2>Add New Report</h2>
          <p>Or</p>
          <p>Sync New Report </p>
        </div>
      </div>
    );
  }

  // Fuse Js calling to update patients Data !
  /* 
  useEffect(()=>{

    // get an array by searching patients data with search input 
    const searchedPatientsData = [] ; 

    // setPatientsData() -> new searched data 

  }, [searchInput]) */

  return (
    // Main Container
    <div className="h-[80vh] pb-10 overflow-y-scroll bg-secondary rounded-md">
      {/* Style of Each Seach Items  */}
      <div className="flex justify-between sticky top-0  w-full bg-primary   font-sans  font-bold text-primary-foreground  items-center px-5 py-4 border z-30  hover:cursor-pointer ">
        {/* <p>id : {_id}</p> */}
        <p className="w-52">REFERNCE NUMBER </p>
        <h2 className="w-52">FULL NAME</h2>
        <p className="w-32"> AGE </p>
        <p className="w-32">GENDER </p>
        <p className="w-32"> REPORT DATE </p>
        <p className="w-32 flex justify-center"> PDF </p>
        <p className="w-32 flex justify-center"> DELETE </p>
      </div>
      <div>
        {patientsData.map((item) => {
          if (item.deleted !== true) {
            return <SearchItem key={item._id} {...item} />;
          }
        })}
      </div>
      <div className="flex justify-between sticky top-0  w-full  bg-destructive font-sans  font-bold text-primary-foreground  items-center px-5 py-4 border z-50 hover:cursor-pointer ">
        {/* <p>id : {_id}</p> */}
        <p className="w-52">REFERNCE NUMBER </p>
        <h2 className="w-52">FULL NAME</h2>
        <p className="w-32"> AGE </p>
        <p className="w-32">GENDER </p>
        <p className="w-32"> DELETED DATE & TIME </p>
        <p className="w-32 flex justify-center">
          <X />
        </p>
        <p className="w-32 flex justify-center">
          <X />
        </p>
      </div>
      <div>
        {patientsData.map((item) => {
          if (item.deleted && item.deleted !== false) {
            return <SearchItemDeleted key={item._id} {...item} />;
          }
        })}
      </div>
    </div>
  );
};
