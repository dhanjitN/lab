"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOutIcon, UserRoundCogIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";

export function UserPopover() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await apiClient.post("/auth/logout");
      if (res.data.success) {
        toast.success(res.data.message || "Success");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Error Occured");
      console.error(error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="hover:cursor-pointer">
          <UserRoundCogIcon size={22} color="#fbd9d3" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="w-48 p-2 bg-popover text-popover-foreground rounded-xl shadow-lg"
      >
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="justify-start text-sm"
            onClick={() => router.push("/")}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-sm"
            onClick={() => router.push("/reports")}
          >
            Reports
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-sm text-destructive hover:cursor-pointer"
            onClick={() => handleLogout()}
          >
            Logout <LogOutIcon />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
