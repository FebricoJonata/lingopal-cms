"use client";

import { Question } from "@/types/question";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

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
    header: "Question",
  },
  {
    accessorKey: "answer_key",
    header: "Answer Key",
    size: 60,
  },
  {
    accessorKey: "choices",
    header: "Multiple Choice",
  },
  {
    accessorKey: "course_name",
    header: "Course Name",
  },
];
