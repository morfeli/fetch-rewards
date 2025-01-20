/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
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

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      Cookies.set("isAuthenticated", "true", { expires: expirationDate });

      toast("Login Successful!", {
        description: "Welcome to DoggySearch! A furry friend awaits you.",
        descriptionClassName: "text-black",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      toast("Login failed!", {
        description: "Please try again!",
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
      <div
        className="bg-gray-100 flex items-center justify-center"
        aria-label="Login success message"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle
              className="text-2xl font-bold text-center"
              aria-label="Welcome back message"
            >
              Welcome Back to DoggySearch!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4" aria-label="Logged in user message">
              You're already logged in. Ready to find your furry friend?
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleDashboardRedirect}
              className="w-full bg-blue-400 text-white hover:bg-blue-500"
              aria-label="Go to dashboard button"
            >
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-100 flex items-center justify-center"
      aria-label="Login form container"
    >
      <Card className="w-full max-w-md" aria-label="Login card">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold text-center"
            aria-label="Login form title"
          >
            Login to DoggySearch
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} aria-label="Login form">
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className="text-slate-700 font-medium"
                aria-label="Name field label"
              >
                Name
              </Label>
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
                aria-label="Enter your name"
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-slate-700 font-medium"
                aria-label="Email field label"
              >
                Email
              </Label>
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
                aria-label="Enter your email"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-400 text-white hover:bg-blue-500"
              disabled={isLoading}
              aria-label={isLoading ? "Logging in process" : "Login button"}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
