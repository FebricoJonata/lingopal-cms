import { DataTable } from "@/components/ui/data-table";
import { getMaterialResource } from "@/services/material-resource";
import { columns } from "./_provider/table-column";

const TextMaterial = async () => {
  const data = await getMaterialResource("Article");

  return (
    <>
      <div className="mt-8">
        <h3>Article Material</h3>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default TextMaterial;
