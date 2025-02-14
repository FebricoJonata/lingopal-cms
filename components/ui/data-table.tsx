"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
}

import { Input } from "@/components/ui/input";

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      {/* <div className="flex items-center py-2">
        <Input
          placeholder={`Search ${filterColumn}...`}
          value={
            (table.getColumn(filterColumn ?? "")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(filterColumn ?? "")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm  "
        />
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="border-r bg-white rounded-md"
                      style={{
                        minWidth: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.size,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-r bg-white rounded-md"
                      style={{
                        minWidth: cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.size,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-self-end mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => table.previousPage()} />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => {
              const currentPage = table.getState().pagination.pageIndex;
              const totalPages = table.getPageCount();

              if (
                i === 0 || // Always show the first page
                i === totalPages - 1 || // Always show the last page
                (i >= currentPage - 1 && i <= currentPage + 1) // Show the current page and its neighbors
              ) {
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i}
                      onClick={() => table.setPageIndex(i)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              if (
                (currentPage > totalPages / 2 && i === 2) ||
                i === totalPages - 2
              ) {
                return (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null; // Skip other pages
            })}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                aria-disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
