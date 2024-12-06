"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_provider/table-column";
import { useQuestionQuery } from "@/services/question";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

const Question = () => {
  const { data, isLoading } = useQuestionQuery(1);
  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-primary font-bold text-2xl">
          Multiple Choice Question
        </h3>
        {/* <Button variant={"default"} size={"icon"} onClick={openDialog}>
          +
        </Button> */}
      </div>

      {isLoading ? (
        <Spinner className="text-primary" />
      ) : (
        <DataTable columns={columns} data={data ?? []} />
      )}
    </>
  );
};

export default Question;
