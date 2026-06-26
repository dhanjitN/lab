"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TypoH4 } from "../../Typography/typo-h4";
import { db } from "@/dexie/dexie.db";
// UI comp

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useReportStore } from "@/lib/hooks/use-report-store";
import { getReportLength } from "@/dexie/dexieClient";
import { useEffect, useState } from "react";
import { getReports } from "@/dexie/dexieClient";
import { useLiveQuery } from "dexie-react-hooks";
import { NewComboBox } from "@/components/selfMade/new-combobox";
// form schema
const formSchema = z.object({
  refNo: z.string(),
  testDate: z.date(),
  reportDate: z.date(),
  refByDoc: z
    .string()
    .min(1, "Doctor Name is required ")
    .regex(/^[A-Za-z\s.]+$/, "Only letters and spaces are allowed"),
});

export default function ReportDetail() {
  const {
    updateReportDetail,
    reportDetails,
    patientDetails,
    labName,
    doctors,
  } = useReportStore();

  const reportsLength = useLiveQuery(() => db.reports.count()) || 0;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      refNo: "",
      testDate: new Date(),
      reportDate: new Date(),
      refByDoc: "SELF",
    },
  });

  useEffect(() => {
    const fetchReportsLength = async () => {
      const paddedLength = String(reportsLength + 1).padStart(4, "0"); // adds leading zeroes
      const getYear = new Date().getFullYear().toString().slice(2);
      const labText = labName.toUpperCase().slice(0, 2);

      form.setValue("refNo", `${labText}-${getYear}-${paddedLength}`);
    };
    fetchReportsLength();
  }, [labName, reportsLength]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const newValues = {
        ...values,
        refByDoc: values.refByDoc?.toUpperCase(),
      };
      const timeout = setTimeout(() => updateReportDetail(newValues), 400);
      return () => clearTimeout(timeout);
    });
    return () => subscription.unsubscribe();
  }, [form, updateReportDetail]);

  useEffect(() => {
    form.trigger();
  }, []);

  const handleDocChange = (value: string) => {
    form.setValue("refByDoc", value);
  };

  return (
    <div className="pt-2 pb-3">
      {/* Report Details */}
      <div>
        <TypoH4 text="Report details : " />
        {/* <div suppressHydrationWarning>
          {JSON.stringify({ ...reportDetails, ...patientDetails })}
        </div> */}
      </div>
      <Form {...form}>
        <form className="space-y-8 ">
          <div className="flex flex-col  md:flex-row pt-1 md:pl-10 justify-start gap-3 items-center">
            {/* Reference Number  */}
            <FormField
              control={form.control}
              name="refNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Number</FormLabel>
                  <FormControl>
                    <Input
                      className="text-red-200"
                      disabled={true}
                      required={true}
                      placeholder="2025-001"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Test Date  */}
            <FormField
              control={form.control}
              name="testDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Test Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Report Date  */}
            <FormField
              control={form.control}
              name="reportDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Report Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ref. by doc  */}
            <FormField
              control={form.control}
              name="refByDoc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ref. By doctor </FormLabel>
                  <FormControl className="min-w-32">
                    {/*   <Input
                      placeholder="Dr. DOCTOR"
                      {...field}
                      required={true}
                      className="uppercase"
                    /> */}
                    <NewComboBox
                      value={field.value}
                      onChange={handleDocChange}
                      options={doctors}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </div>
  );
}
