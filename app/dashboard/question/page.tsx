"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_provider/table-column";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { useDialog } from "@/hooks/use-dialog";
import {
  useCreateQuestionMutation,
  useEditQuestionMutation,
  useQuestionQuery,
} from "@/services/question";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MultipleChoice } from "@/types/question";
import { CourseDropdown } from "./_components/course-dropdown";
import { CourseLevel } from "./_contants";

const Question = () => {
  const {
    isOpen,
    onClose,
    onOpen,
    data: modalFormData,
    setData: setModalFormData,
  } = useDialog();

  const { mutate: editMultipleQuestion } = useEditQuestionMutation();
  const { mutate: createMultipleQuestion } = useCreateQuestionMutation();
  const [currentChoice, setCurrentChoice] = useState<string>("");

  const initialmodalFormData: MultipleChoice = {
    id: null,
    question: "",
    practiceLevel: "",
    choices: [],
    answerKey: "",
  };

  const openDialog = () => {
    setModalFormData(initialmodalFormData); // Reset form data
    onOpen();
  };

  const closeDialog = () => {
    setModalFormData(initialmodalFormData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === "string" ? e : e.target.value;
    const name = typeof e === "string" ? "practiceLevel" : e.target.name;

    setModalFormData({
      ...modalFormData,
      [name]: value,
    });
  };

  const handleChoiceAdd = () => {
    if (
      currentChoice.trim() !== "" &&
      (modalFormData.choices?.length ?? 0) < 4
    ) {
      setModalFormData({
        ...modalFormData,
        choices: [...(modalFormData.choices || []), currentChoice],
      });
      setCurrentChoice(""); // Reset input field
    }
  };

  const handleChoiceRemove = (index: number) => {
    const updatedChoices =
      modalFormData.choices?.filter((_: string, i: number) => i !== index) ||
      [];
    setModalFormData({
      ...modalFormData,
      choices: updatedChoices,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeDialog();

    if (
      modalFormData &&
      !modalFormData.choices.includes(modalFormData.answerKey)
    ) {
      return toast.error("Answer key isn't in the choices array");
    }

    if (modalFormData.id) {
      const editPayload = {
        id: modalFormData.id,
        question: modalFormData.question,
        practice_id: modalFormData.practiceLevel,
        answer_key: modalFormData.answerKey,
        choices: modalFormData.choices || [],
      };
      editMultipleQuestion(editPayload);
    } else {
      const createPayload = {
        question: modalFormData.question,
        practice_id: Number(modalFormData.practiceLevel),
        choices: modalFormData.choices || [],
        answer_key: modalFormData.answerKey,
      };
      createMultipleQuestion(createPayload);
    }
  };

  const { data, isLoading } = useQuestionQuery(1);

  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-primary font-bold text-2xl">
          Multiple Choice Question
        </h3>

        {/* Wrap Dropdown and Button */}
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter By Course" />
            </SelectTrigger>
            <SelectContent>
              {CourseLevel?.map((course) => (
                <SelectItem key={course.value} value={String(course.value)}>
                  {course.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant={"default"} size={"default"} onClick={openDialog}>
            Add Question
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Spinner className="text-primary" />
      ) : (
        <DataTable columns={columns} data={data ?? []} />
      )}

      <Dialog open={isOpen} modal defaultOpen={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Multiple Choice Question</DialogTitle>
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
                Question <span className="text-red-500">*</span>
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
              <label className="block text-sm font-medium text-gray-700">
                Course <span className="text-red-500">*</span>
              </label>
              <CourseDropdown
                value={String(modalFormData.practiceLevel) || "-"}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Choices <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={currentChoice}
                  onChange={(e) => setCurrentChoice(e.target.value)}
                  placeholder="Add a choice"
                />
                <Button
                  type="button"
                  variant={"default"}
                  onClick={handleChoiceAdd}
                  disabled={(modalFormData.choices?.length ?? 0) >= 4}
                >
                  Add Choice
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(modalFormData.choices || []).map(
                  (choice: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 px-4 py-2 rounded-md"
                    >
                      <span className="mr-2">{choice}</span>
                      <button
                        type="button"
                        onClick={() => handleChoiceRemove(index)}
                        className="text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="answerKey"
                className="block text-sm font-medium text-gray-700"
              >
                Answer <span className="text-red-500">*</span>
              </label>
              <Input
                id="answerKey"
                name="answerKey"
                type="text"
                value={modalFormData.answerKey || ""}
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

export default Question;
