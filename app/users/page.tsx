import { DataTable } from "@/components/ui/data-table";
import { getUsers } from "@/services/user";
import { columns } from "./_providers/table-column";

const User = async () => {
  const data = await getUsers();

  return (
    <>
      <div className="mt-8">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default User;
