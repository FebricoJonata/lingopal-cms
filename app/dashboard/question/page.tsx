import { DataTable } from "@/components/ui/data-table";
import { getQuestion } from "@/services/question";
import { columns } from "./_provider/table-column";

const Question = async () => {
  const data = await getQuestion(1);
  return (
    <>
      {" "}
      <div className="mt-8">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Question;
