import { DataTable } from "@/components/ui/data-table";
import { getUsers } from "@/services/user";
import { columns } from "./_providers/table-column";

const User = async () => {
  const data = await getUsers();

  return (
    <>
      <h1>Welcome to users page</h1>
      <div className="">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default User;
