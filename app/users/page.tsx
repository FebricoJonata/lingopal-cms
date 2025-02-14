"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_providers/table-column";
import { useUserQuery } from "@/services/user";
import { Spinner } from "@/components/ui/spinner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const User = () => {
  const { data, isLoading } = useUserQuery();
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="flex justify-between mb-6 items-center">
        <h3 className="text-primary font-bold text-2xl">LingoPal Users</h3>
      </div>

      <div className="relative w-2/5 mb-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

        <Input
          placeholder="Search Users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
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
