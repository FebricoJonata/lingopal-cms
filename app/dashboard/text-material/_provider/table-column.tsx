"use client";

import { MaterialResource } from "@/types/material-resource";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

export const columns: ColumnDef<MaterialResource>[] = [
  {
    accessorKey: "idx",
    header: () => <div className="text-center">No.</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("idx")}</div>,
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
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <a
        className="text-sky-600 hover:underline"
        target="_blank"
        href={row.getValue("source")}
      >
        View Source
      </a>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
