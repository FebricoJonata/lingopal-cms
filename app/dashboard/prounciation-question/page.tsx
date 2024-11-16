import { DataTable } from "@/components/ui/data-table";
import { getQuestion } from "@/services/question";
import { columns } from "./_provider/table-column";

const ProunciationQuestion = async () => {
  const data = await getQuestion(2);
  return (
    <>
      <div className="mt-8">
        <h3>Prounciation Question</h3>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default ProunciationQuestion;
