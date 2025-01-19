"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

import { Dog, Loader2 } from "lucide-react";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Button } from "../ShadcnUI/Button";

const NAV_LINKS = [
  { href: "/dashboard", label: "Home" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface HeaderProps {
  isAuthenticated: RequestCookie | undefined;
}

export default function Header({
  isAuthenticated: initialIsAuthenticated,
}: HeaderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialIsAuthenticated?.value === "true",
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = Cookies.get("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
    };

    checkAuthStatus();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      Cookies.remove("isAuthenticated");
      setIsAuthenticated(false);

      toast("Logout Successful", {
        description: "You have been successfully logged out.",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Logout error:", error);
      toast("Logout Failed", {
        description: "An error occurred during logout. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderNavContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-baseline space-x-4">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                pathname === href
                  ? "text-slate-900 underline underline-offset-4"
                  : "text-gray-600"
              }`}
            >
              {label}
            </Link>
          ))}
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoading}
            className="p-0 h-8 px-4 rounded-2xl bg-slate-700 text-white hover:bg-slate-800"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      );
    }

    return (
      <div className="bg-slate-500 p-2 rounded-xl shadow-md text-center">
        <p className="text-base font-bold text-white">A furry friend awaits!</p>
        <p className="text-sm text-white">Please login to get started. 🐶💕</p>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-md ">
      <div className="px-4 py-4 flex items-center justify-between w-full">
        <Link href="/" className="flex items-center space-x-2">
          <Dog className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">DoggySearch</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6  justify-center">
          {renderNavContent()}
        </nav>
      </div>
    </header>
  );
}
