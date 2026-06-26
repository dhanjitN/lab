"use client";

import { SearchBar } from "@/components/reports/search-bar";
import { SearchResults } from "@/components/reports/search-results";
import { handleSync } from "@/lib/misc/handle-sync";
import { useEffect } from "react";

export default function ReportPage() {
  useEffect(() => {
    handleSync();
  }, []);
  return (
    <div
      className="
        pt-3
        px-3
        absolute top-[5rem] sm:top-[5rem] left-0 
       
        bg-neutral-100 dark:bg-neutral-900 
        overflow-hidden
        inset-0"
    >
      <div className="pt-5 flex flex-col justify-center gap-2 h-auto ">
        {/* Search Bar Component */}
        <SearchBar />

        {/* Search Results Component */}
        <SearchResults />
      </div>
    </div>
  );
}
