"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_provider/table-column";
import { useQuestionQuery } from "@/services/question";

const Question = () => {
  const { data, isLoading } = useQuestionQuery(1);
  return (
    <>
      <div className="mt-8">
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
};

export default Question;
