import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { JSX } from "react";

export function CustomTooltip({
  Element,
  tooltip,
  styling = "outline",
}: {
  Element: JSX.Element;
  tooltip: string;
  styling: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className={`hover:cursor-pointer  `} variant={`${styling}`}>
          <div>{Element}</div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
