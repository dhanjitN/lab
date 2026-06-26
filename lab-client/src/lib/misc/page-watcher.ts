"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageReloadOnReturn() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    // If we're moving FROM some other path TO "/"
    if (prevPath.current !== "/" && pathname === "/") {
      window.location.reload();
    }
    // Update the previous path
    prevPath.current = pathname;
  }, [pathname]);

  return null;
}
