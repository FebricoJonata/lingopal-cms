"use client";

import { Button } from "@/components/ui/button";
import { MaterialResource } from "@/types/material-resource";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDialog } from "@/hooks/use-dialog";
import { useDeleteMaterialMutation } from "@/services/material-resource";
import { DeleteConfirmationDialog } from "@/components/dialog/delete-confirmation-dialog";

const ActionCell: React.FC<{ row: any }> = ({ row }) => {
  const { onOpen: openEditDialog, setData: setFormData } = useDialog();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutate: deleteMaterial } = useDeleteMaterialMutation();

  const openDialog = () => {
    const rowData = row.original;
    setFormData({
      id: rowData.id,
      category: rowData.category,
      content: rowData.content,
      cover: rowData.cover,
      description: rowData.description,
      source: rowData.source,
      title: rowData.title,
      type: "Article",
    });

    openEditDialog();
  };

  const handleOpenDialog = () => {
    console.log("Material_id:" + row.original.id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirm = () => {
    deleteMaterial(row.original.id);
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
export const columns: ColumnDef<MaterialResource>[] = [
  {
    accessorKey: "idx",
    header: () => <div className="text-center">No.</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("idx")}</div>,
    size: 30,
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <ActionCell row={row} />,
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
    size: 80,
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
    size: 70,
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
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <a
        className="text-sky-600 hover:underline"
        target="_blank"
        href={row.getValue("content")}
      >
        View Content
      </a>
    ),
    size: 80,
  },
];
