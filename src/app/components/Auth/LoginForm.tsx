"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const [credentials, setCredentials] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
        }),
        credentials: "include", // Add this line
      },
    );

    if (!res.ok) {
      console.log("error");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login to DoggySearch
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
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
              <Label>Email</Label>

              <Input
                type="text"
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
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
