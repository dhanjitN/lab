"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TypoH4 } from "../../Typography/typo-h4";

// UI comp
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

import { useReportStore } from "@/lib/hooks/use-report-store";
import { useEffect } from "react";
import SelectGender from "@/components/selfMade/select-gender";

// form schema
const formSchema = z.object({
  name: z
    .string()
    .min(1, "Patient's Name is Required")
    .regex(/^[A-Za-z\s.]+$/, "Only letters and spaces are allowed"),
  age: z
    .string()
    .min(1, "Age is Required")
    .regex(/^\s*(100|[1-9][0-9]?)\s*$/, "Age can be between 1 - 100"),
  sex: z.string().min(1, "Gender is Required"),
});

export default function ReportDetail() {
  const { updatePatientDetail } = useReportStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      age: "",
      sex: "MALE",
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const newValues = {
        ...values,
        name: values.name?.toUpperCase(),
        sex: values.sex?.toUpperCase(),
      };
      const timeout = setTimeout(() => updatePatientDetail(newValues), 400);
      return () => clearTimeout(timeout);
    });
    return () => subscription.unsubscribe();
  }, [form, updatePatientDetail]);

  useEffect(() => {
    form.trigger();
  }, []);
  /* function onSubmit(values: z.infer<typeof formSchema>) {
    updateReportDetail(values);
  } */
  return (
    <div className="pt-2 pb-3">
      {/* Patient Details */}
      <div className=" ">
        <TypoH4 text="Patient details : " />
      </div>
      <Form {...form}>
        <form className="space-y-8 md:pl-10">
          <div className="flex md:flex-row flex-col  pt-1 justify-start gap-3 items-center">
            {/* Name  */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="RAMESH"
                      className="uppercase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age  */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age </FormLabel>
                  <FormControl>
                    <Input placeholder="21" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age  */}
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sex </FormLabel>
                  {/* <FormControl> */}
                  {/* <Input
                      placeholder="MALE"
                      className="uppercase"
                      {...field}
                    /> */}
                  <SelectGender value={field.value} onChange={field.onChange} />
                  {/* </FormControl> */}
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
