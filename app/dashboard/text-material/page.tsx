"use client";

import { DataTable } from "@/components/ui/data-table";
import {
  useMaterialResourcesQuery,
  useCreateMaterialMutation,
  useEditMaterialMutation,
} from "@/services/material-resource";
import { columns } from "./_provider/table-column";
import { Spinner } from "@/components/ui/spinner";
import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MaterialResource } from "@/types/material-resource";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
// import {
//   useCreateQuestionMutation,
//   useEditQuestionMutation,
//   useQuestionQuery,
// } from "@/services/question";

const TextMaterial = () => {
  const {
    isOpen,
    onClose,
    onOpen,
    data: modalFormData,
    setData: setModalFormData,
  } = useDialog();
  const { mutate: editArticleMaterial } = useEditMaterialMutation();
  const { mutate: createArticleMaterial } = useCreateMaterialMutation();
  const initialmodalFormData: MaterialResource = {
    id: null,
    category: "",
    content: "",
    cover: "",
    description: "",
    source: "",
    title: "",
    type: "Article",
  };
  const closeDialog = () => {
    setModalFormData(initialmodalFormData);
    onClose();
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModalFormData({ ...modalFormData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeDialog();

    if (modalFormData.id) {
      const editPayload = {
        id: modalFormData.id,
        category: modalFormData.category,
        content: modalFormData.content,
        cover: modalFormData.cover,
        description: modalFormData.description,
        source: modalFormData.source,
        title: modalFormData.title,
        type: "Article",
      };
      editArticleMaterial(editPayload);
    } else {
      const createPayload = {
        category: modalFormData.category,
        content: modalFormData.content,
        cover: modalFormData.cover,
        description: modalFormData.description,
        source: modalFormData.source,
        title: modalFormData.title,
        type: "Article",
      };
      createArticleMaterial(createPayload);
    }
  };

  const { data, isLoading } = useMaterialResourcesQuery("Article");
  const openDialog = () => {
    setModalFormData(initialmodalFormData); // Reset form data
    onOpen();
  };
  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-primary font-bold text-2xl">
          Articel Material Resource
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
            <DialogTitle>Material Resource Article</DialogTitle>
            <DialogDescription>
              Please fill out the form below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                value={modalFormData.title || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                value={modalFormData.content || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="cover"
                className="block text-sm font-medium text-gray-700"
              >
                Cover
              </label>
              <Input
                id="cover"
                name="cover"
                type="text"
                value={modalFormData.cover || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={modalFormData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Input
                id="category"
                name="category"
                type="text"
                value={modalFormData.category || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-gray-700"
              >
                Source
              </label>
              <Input
                id="source"
                name="source"
                type="text"
                value={modalFormData.source || ""}
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

export default TextMaterial;
