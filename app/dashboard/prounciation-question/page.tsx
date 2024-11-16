"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_provider/table-column";
import { useQuestionQuery } from "@/services/question";

const ProunciationQuestion = () => {
  const { data, isLoading } = useQuestionQuery(2);
  return (
    <>
      <div className="mt-8">
        <h3>Prounciation Question</h3>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </>
  );
};

export default ProunciationQuestion;
