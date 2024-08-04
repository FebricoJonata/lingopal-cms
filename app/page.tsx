"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

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
        console.log("Masuk");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="border-solid border-2 rounded-md p-6 bg-white w-1/5 mx-auto">
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
          Login
        </Button>
      </div>
    </div>
  );
}
