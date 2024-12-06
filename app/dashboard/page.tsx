"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Lottie from "lottie-react";
import Lingo from "@/assets/Lingo.json";
import { UserChart } from "@/components/chart/area-chart";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

const Dashboard = () => {
  const router = useRouter();

  const directToUserPage = () => {
    router.push("/users");
  };

  return (
    <>
      {/* <h1 className="text-primary font-roboto font-bold text-2xl">Dashboard</h1> */}
      {/* <Spinner size="large" /> */}
      <div className="flex flex-row gap-4 my-4">
        <Card className="basis-1/3">
          <CardHeader>
            <div className="flex justify-between">
              <h3 className="font-medium text-md">Active User</h3>
              <Users color="black" />
            </div>
            <CardTitle className="text-3xl">300+</CardTitle>
            <CardDescription>+180.1% from last month</CardDescription>
          </CardHeader>
        </Card>
        <Card className="basis-1/3">
          <CardHeader>
            <div className="flex justify-between">
              <h3 className="font-medium text-md">Active User</h3>
              <Users color="black" />
            </div>
            <CardTitle className="text-3xl">300+</CardTitle>
            <CardDescription>+180.1% from last month</CardDescription>
          </CardHeader>
        </Card>
        <Card className="basis-1/3">
          <CardHeader>
            <div className="flex justify-between">
              <h3 className="font-medium text-md">Active User</h3>
              <Users color="black" />
            </div>
            <CardTitle className="text-3xl">300+</CardTitle>
            <CardDescription>+180.1% from last month</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <div className="flex flex-col basis-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Visitor Summary</CardTitle>
              <CardDescription>Key stats at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div>
                  Total Visitors: <strong>1039</strong>
                </div>
                <div>
                  Top Month: <strong>March (237 visitors)</strong>
                </div>
                <div>
                  Growth: <strong>5.2%</strong>
                </div>
              </div>
              <Button
                variant={"default"}
                className="mt-4"
                onClick={directToUserPage}
              >
                View Users
              </Button>
            </CardContent>
          </Card>
          <Lottie
            animationData={Lingo}
            className="align-bottom mt-auto self-center"
          />
        </div>
        <Card className="basis-3/4">
          <UserChart />
          {/* <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            </CardHeader> */}
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
