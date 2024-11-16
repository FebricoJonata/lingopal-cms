"use client";

import { DataTable } from "@/components/ui/data-table";
import { useMaterialResourcesQuery } from "@/services/material-resource";
import { columns } from "./_provider/table-column";
import { MaterialResource } from "../../../types/material-resource";

const TextMaterial = () => {
  const { data, isLoading } = useMaterialResourcesQuery("Article");

  return (
    <>
      <div className="mt-8">
        <h3>Article Material</h3>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
};

export default TextMaterial;
