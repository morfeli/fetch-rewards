"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import Cookies from "js-cookie";

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated") === "true";

    if (!isAuthenticated && pathname !== "/") {
      router.push("/");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
