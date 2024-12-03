"use client";

import Lottie from "lottie-react";
import Success from "@/assets/success.json";
import { Button } from "@/components/ui/button";

const SuccessVerified = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <Lottie animationData={Success} className="w-[50%] h-[50%]" />
      <h1 className="text-4xl text-primary font-bold">
        Email successfully Verified!
      </h1>
      <p className="text-gray-500 text-center max-w-md mt-2 mb-4">
        Your email has been successfully verified. You can now access all
        features of your account without any restrictions. Thank you for
        verifying your email!
      </p>
      <Button onClick={() => window.close()} size={"lg"}>
        Back to Apps
      </Button>
    </div>
  );
};

export default SuccessVerified;
