"use client";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../dark-mode";
import { TypoH2 } from "../Typography/typo-h2";
import { TypoH3 } from "../Typography/typo-h3";
import { TypoH4 } from "../Typography/typo-h4";
import {
  Boxes,
  ClipboardPlus,
  PlusCircle,
  ToolCase,
  UserRoundCog,
  UserRoundCogIcon,
} from "lucide-react";
import { CustomTooltip } from "../selfMade/custom-tooltip";
import { useReportStore } from "@/lib/hooks/use-report-store";
import { useEffect, useState } from "react";
import { UserPopover } from "../selfMade/user-popover";

export default function Header() {
  const router = useRouter();
  const { labName } = useReportStore();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    if (isOpen == false) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  return (
    <div className="fixed top-0  left-1/2   -translate-x-1/2 z-50 w-full backdrop-blur-md shadow-lg rounded-2xl">
      <div className="bg-accent mt-3 mb-3  rounded-xl md:mx-10 border border-border/40  shadow-md flex justify-between items-center px-4 md:px-8 min-h-[8vh] md:min-h-[10vh]">
        <div
          className="font-[sora] text-secondary-foreground hover:cursor-pointer"
          // onClick={() => router.push("/")}
        >
          <div className="flex gap-1">
            <div onClick={handleOpen}>
              {/* <UserRoundCogIcon size={22} color="#fbd9d3" /> */}
              <UserPopover />
            </div>
            <TypoH2 text={labName} />
            <h1 className="md:hidden">{labName}</h1>
          </div>
        </div>
        <div
          onClick={() => {
            router.push("/");
          }}
          className="hover:shadow-md hover:cursor-pointer"
        >
          <CustomTooltip
            styling={pathname === "/" ? "default" : "outline"}
            Element={<PlusCircle />}
            tooltip="Create New Report"
          />
        </div>
        <div
          onClick={() => {
            router.push("/reports");
          }}
          className="hover:cursor-pointer"
        >
          <CustomTooltip
            styling={pathname === "/reports" ? "default" : "outline"}
            Element={<ClipboardPlus />}
            tooltip="All Reports"
          />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <TypoH4 text="" />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
