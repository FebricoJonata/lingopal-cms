"use client";

import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "idx",
    header: () => <div className="text-center">No.</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("idx")}</div>,
    size: 20,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "birth_date",
    header: "Birth Date",
  },
];
