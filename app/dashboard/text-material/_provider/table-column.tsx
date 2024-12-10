"use client";

import { Button } from "@/components/ui/button";
import { MaterialResource } from "@/types/material-resource";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";

export const columns: ColumnDef<MaterialResource>[] = [
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
    size: 60,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4 hover:bg-accent" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4 hover:bg-accent" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4 hover:bg-accent" />
        </Button>
      );
    },
  },
];
