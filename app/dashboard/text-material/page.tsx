"use client";

import { DataTable } from "@/components/ui/data-table";
import { useMaterialResourcesQuery } from "@/services/material-resource";
import { columns } from "./_provider/table-column";
import { Spinner } from "@/components/ui/spinner";

const TextMaterial = () => {
  const { data, isLoading } = useMaterialResourcesQuery("Article");

  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-primary font-bold text-2xl">
          Articel Material Resource
        </h3>
      </div>

      {isLoading ? (
        <Spinner className="text-primary" />
      ) : (
        <DataTable columns={columns} data={data ?? []} />
      )}
    </>
  );
};

export default TextMaterial;
