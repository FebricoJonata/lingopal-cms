"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_provider/table-column";
import {
  useCreateQuestionMutation,
  useEditQuestionMutation,
  useQuestionQuery,
} from "@/services/question";
import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

const ProunciationQuestion = () => {
  const {
    isOpen,
    onClose,
    onOpen,
    data: modalFormData,
    setData: setModalFormData,
  } = useDialog();

  const { mutate: editProunciationQuestion } = useEditQuestionMutation();
  const { mutate: createProunciationQuestion } = useCreateQuestionMutation();

  const initialmodalFormData = {
    id: null,
    question: "",
    practiceLevel: "",
  };

  const openDialog = () => {
    setModalFormData(initialmodalFormData); // Reset form data
    onOpen();
  };

  const closeDialog = () => {
    setModalFormData(initialmodalFormData); // Reset form data
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalFormData(initialmodalFormData); // Reset form data
    closeDialog();

    if (modalFormData.id) {
      const editPayload = {
        id: modalFormData.id,
        question: modalFormData.question,
        practice_id: modalFormData.practiceLevel,
      };

      editProunciationQuestion(editPayload);
    } else {
      const createPayload = {
        question: modalFormData.question,
        practice_id: Number(modalFormData.practiceLevel),
      };
      createProunciationQuestion(createPayload);
    }
  };

  const { data, isLoading } = useQuestionQuery(2);

  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-primary font-bold text-2xl">
          Prounciation Question
        </h3>
        <Button variant={"default"} size={"icon"} onClick={openDialog}>
          +
        </Button>
      </div>

      {isLoading ? (
        <Spinner className="text-primary" />
      ) : (
        <DataTable columns={columns} data={data ?? []} />
      )}

      <Dialog open={isOpen} modal defaultOpen={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prounciation Question</DialogTitle>
            <DialogDescription>
              Please fill out the form below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <Input
                id="question"
                name="question"
                type="text"
                value={modalFormData.question || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="practiceLevel"
                className="block text-sm font-medium text-gray-700"
              >
                Practice ID
              </label>
              <Input
                id="practiceLevel"
                name="practiceLevel"
                type="practiceLevel"  
                value={modalFormData.practiceLevel || ""}
                onChange={handleChange}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant={"outline"} onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" variant={"default"}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProunciationQuestion;
