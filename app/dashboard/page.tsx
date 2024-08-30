"use client";

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
import Robo from "@/assets/Robo.json";

const Dashboard = () => {
  const { isOpen, onClose, onOpen } = useDialog();

  const openDialog = () => {
    onOpen();
  };

  const closeDialog = () => onClose();

  return (
    <>
      <h1 className="text-white font-roboto font-bold text-2xl"></h1>
      {/* <Spinner size="large" /> */}
      <div className="flex flex-row gap-4 my-4">
        <Card className="basis-1/3 bg-brown">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
        <Card className="basis-1/3">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
        <Card className="basis-1/3">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Lottie animationData={Robo} className="w-1/4" />

      <Button variant={"default"} size={"lg"} onClick={openDialog}>
        Open Modal
      </Button>
      <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
        <DialogContent>
          <DialogHeader>
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
