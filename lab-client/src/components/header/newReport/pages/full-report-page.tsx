"use client";
import { Button } from "@/components/ui/button";
import { useReportStore } from "@/lib/hooks/use-report-store";
import { MinusCircle, Plus, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import NewPage from "./new-page";

export default function FullReportPage() {
  const { pages, addPage } = useReportStore();
  const addNewPage = () => {
    addPage();
    toast.success("Page Added ");
  };
  return (
    <div className="flex flex-col   ">
      <Button className="self-end hover:cursor-pointer" onClick={addNewPage}>
        New Page <PlusCircle />
      </Button>
      {pages &&
        pages.length > 0 &&
        pages.map((page) => {
          return <NewPage key={page.id} page={page} />;
        })}
    </div>
  );
}
