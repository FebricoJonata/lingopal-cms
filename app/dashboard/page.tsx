"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useDialog } from "@/hooks/use-dialog";
import Lottie from "lottie-react";
import Lingo from "@/assets/Lingo.json";

import LingoSad from "@/assets/images/lingo_sad.png";
import { LucideIcon, Users } from "lucide-react";

const Dashboard = () => {
  const { isOpen, onClose, onOpen } = useDialog();

  const openDialog = () => {
    onOpen();
  };

  const closeDialog = () => onClose();

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
        <Lottie animationData={Lingo} className="basis-1/4" />
        <Card className="basis-3/4">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Card className="w-full mt-4 h-72">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>

      <Button variant={"default"} size={"lg"} onClick={openDialog}>
        Open Modal
      </Button>
      <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
        <DialogContent>
          <DialogHeader className="flex items-center gap-3">
            <Image src={LingoSad} alt="Lingo" width={100} height={100} />
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Button type="submit" onClick={closeDialog}>
            Okay
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
