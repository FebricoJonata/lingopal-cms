"use client";

import { Button } from "@/components/ui/button";
import { Question } from "@/types/question";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";

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
    cell: ({ row }) => (
      <div className="text-sm flex">
        <Trash2 className="text-red-400 text-sm" width={20} height={20} />
        <Edit className="text-blue-600 text-sm" width={20} height={20} />
      </div>
    ),
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
    accessorKey: "practice_id",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Practice ID
          <ArrowUpDown className="ml-2 h-4 w-4 hover:bg-accent" />
        </Button>
      );
    },
    size: 70,
  },
];
