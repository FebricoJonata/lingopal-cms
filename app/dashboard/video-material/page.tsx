import { DataTable } from "@/components/ui/data-table";
import { getMaterialResource } from "@/services/material-resource";
import { columns } from "./_provider/table-column";

const VideoMaterial = async () => {
  const data = await getMaterialResource("Video");

  return (
    <>
      <div className="mt-8">
        <h3>Video Material</h3>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default VideoMaterial;
