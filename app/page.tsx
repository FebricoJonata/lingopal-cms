"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://lingo-pal-backend-v1.vercel.app/api/users/signin",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="border-solid border-2 border-white rounded-md p-6 bg-white lg:w-1/5 mx-auto sm:w-1/2">
        <h1 className="font-bold text-2xl text-primary mb-4 ">Login</h1>
        <Input
          type="email"
          placeholder="Email"
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button size={"lg"} onClick={login}>
          {isLoading && <Spinner size="small" className="mr-1" />}
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </div>
    </div>
  );
}
