"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_provider/table-column";
import { useMaterialResourcesQuery } from "@/services/material-resource";

const VideoMaterial = () => {
  const { data, isLoading } = useMaterialResourcesQuery("Video");

  return (
    <>
      <div className="mt-8">
        <h3>Video Material</h3>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
};

export default VideoMaterial;
