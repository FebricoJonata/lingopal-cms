"use client";

import Lottie from "lottie-react";
import Success from "@/assets/success.json";
import { Button } from "@/components/ui/button";

const SuccessVerified = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <Lottie
        animationData={Success}
        className="lg:w-[50%] lg:h-[50%] w-[35%] h-[35%]"
      />
      <h1 className="lg:text-4xl text-2xl  text-primary font-bold">
        Email successfully Verified!
      </h1>
      <p className="text-gray-500 text-center lg:max-w-md px-4 mt-2 mb-4 lg:text-md text-sm">
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
