"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button type="button" variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant={"default"} onClick={onConfirm}>
            Yes!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
