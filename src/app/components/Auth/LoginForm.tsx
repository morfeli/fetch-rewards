"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ShadcnUI/Card";
import { Label } from "../ShadcnUI/Label";
import { Input } from "../ShadcnUI/Input";
import { Button } from "../ShadcnUI/Button";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface LoginFormProps {
  isAuthenticated: RequestCookie | undefined;
}

export default function LoginForm({ isAuthenticated }: LoginFormProps) {
  const [credentials, setCredentials] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
          }),
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Login failed");
      }

      // Set cookie instead of localStorage
      Cookies.set("isAuthenticated", "true", { expires: 1 }); // Cookie expires in 1 day

      toast("Login Successful!", {
        description: "Welcome to DoggySearch! A furry friend awaits you. <3",
        descriptionClassName: "text-black",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);

      toast("Login failed!", {
        description: "Please try again </3 :(",
        descriptionClassName: "text-black",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDashboardRedirect = () => {
    router.push("/dashboard");
  };

  if (isAuthenticated) {
    return (
      <div className="bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back to DoggySearch!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">
              You're already logged in. Ready to find your furry friend?
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleDashboardRedirect}
              className="w-full bg-blue-400 text-white hover:bg-blue-500"
            >
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login to DoggySearch
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={credentials.name}
                onChange={(e) =>
                  setCredentials((curr) => ({
                    ...curr,
                    name: e.target.value,
                  }))
                }
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((curr) => ({
                    ...curr,
                    email: e.target.value,
                  }))
                }
                required
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-400 text-white hover:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
