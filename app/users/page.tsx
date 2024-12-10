"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_providers/table-column";
import { useUserQuery } from "@/services/user";
import { Spinner } from "@/components/ui/spinner";

const User = () => {
  const { data, isLoading } = useUserQuery();

  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-primary font-bold text-2xl">Users</h3>
      </div>

      {isLoading ? (
        <Spinner className="text-primary" />
      ) : (
        <DataTable columns={columns} data={data ?? []} />
      )}
    </>
  );
};

export default User;
