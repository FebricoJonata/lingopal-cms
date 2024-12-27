"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { setCookie } from "nookies";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://lingo-pal-backend-v1.vercel.app/api/users/admin-signin",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        toast.success("Login Success");
        setCookie(null, "authToken", response.data.token, {
          maxAge: 60 * 60 * 24 * 100, // 100 days in seconds
          path: "/", // Cookie accessible across the app
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Invalid Crendetials!");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <Toaster richColors position="top-right" />

      <div className="border-solid border-1 border-white rounded-md  p-10 bg-white lg:w-[30%] mx-auto sm:w-1/2">
        <h1 className="font-bold text-2xl text-primary mb-4 ">Login</h1>
        <form method="post" onSubmit={login}>
          <Input
            type="email"
            placeholder="Email"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button size={"full"} type="submit">
            {isLoading && <Spinner size="small" className="mr-1" />}
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
