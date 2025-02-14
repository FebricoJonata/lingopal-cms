"use client";

import { Button } from "@/components/ui/button";
import { Question } from "@/types/question";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteQuestionMutation } from "@/services/question";
import { useDialog } from "@/hooks/use-dialog";

import { DeleteConfirmationDialog } from "@/components/dialog/delete-confirmation-dialog";
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
      answerKey: rowData.answer_key,
      choices: rowData.choices as [],
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
    header: "Action",
    cell: ({ row }) => <ActionCell row={row} />,
    size: 40,
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
    accessorKey: "answer_key",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Answer Key
          <ArrowUpDown className="ml-2 h-4 w-4 hover:bg-accent" />
        </Button>
      );
    },
    size: 80,
  },
  {
    accessorKey: "choices",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Multiple Choice
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
    size: 100,
  },
];
