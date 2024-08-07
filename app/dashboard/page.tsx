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
import { Spinner } from "@/components/ui/spinner";
import { useDialog } from "@/hooks/use-dialog";

const Dashboard = () => {
  const { isOpen, onClose, onOpen } = useDialog();

  const openDialog = () => {
    onOpen();
  };

  const closeDialog = () => onClose();

  return (
    <>
      <h1 className="text-sky-700 font-roboto font-bold text-2xl flex justify-center">
        This Dashboard
      </h1>
      <Spinner size="large" />
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
