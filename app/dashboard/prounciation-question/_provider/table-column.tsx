"use client";

import { DeleteConfirmationDialog } from "@/components/dialog/delete-confirmation-dialog";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/use-dialog";
import { useDeleteQuestionMutation } from "@/services/question";
import { Question } from "@/types/question";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

const ActionCell: React.FC<{ row: any }> = ({ row }) => {
  const { onOpen: openEditDialog, setData: setFormData } = useDialog();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutate: deleteQuestion } = useDeleteQuestionMutation();

  const openDialog = () => {
    const rowData = row.original;
    setFormData({
      id: rowData.quiz_id,
      question: rowData.question,
      practiceLevel: rowData.practice_id,
    });
    openEditDialog();
  };

  const handleOpenDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirm = () => {
    deleteQuestion(row.original.quiz_id);
    setDeleteDialogOpen(false);
  };

  return (
    <div className="text-sm flex">
      <Trash2
        className="text-red-400 text-sm cursor-pointer"
        width={20}
        height={20}
        onClick={handleOpenDialog}
      />
      <Edit
        className="text-blue-600 text-sm cursor-pointer"
        width={20}
        height={20}
        onClick={openDialog}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "idx",
    header: () => <div className="text-center">No.</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("idx")}</div>,
    size: 30,
  },
  {
    accessorKey: "quiz_id",
    header: () => <div className="">Action</div>,
    cell: ({ row }) => <ActionCell row={row} />,
    size: 30,
  },
  {
    accessorKey: "question",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question
          <ArrowUpDown className="ml-2 h-4 w-4 hover:bg-accent" />
        </Button>
      );
    },
  },
  {
    accessorKey: "course_name",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Name
          <ArrowUpDown className="ml-2 h-4 w-4 hover:bg-accent" />
        </Button>
      );
    },
  },
  {
    accessorKey: "practice_code",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Level of Question
          <ArrowUpDown className="ml-2 h-4 w-4 hover:bg-accent" />
        </Button>
      );
    },
    size: 70,
  },
];
