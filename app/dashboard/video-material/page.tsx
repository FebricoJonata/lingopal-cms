"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_provider/table-column";
import { useMaterialResourcesQuery } from "@/services/material-resource";
import { Spinner } from "@/components/ui/spinner";

const VideoMaterial = () => {
  const { data, isLoading } = useMaterialResourcesQuery("Video");

  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-primary font-bold text-2xl">
          Video Material Resource
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

export default VideoMaterial;
