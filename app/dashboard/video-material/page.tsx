"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_provider/table-column";
import {
  useMaterialResourcesQuery,
  useCreateMaterialMutation,
  useEditMaterialMutation,
} from "@/services/material-resource";
import { Spinner } from "@/components/ui/spinner";
import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";
import { MaterialResource } from "@/types/material-resource";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { useState } from "react";
const VideoMaterial = () => {
  const {
    isOpen,
    onClose,
    onOpen,
    data: modalFormData,
    setData: setModalFormData,
  } = useDialog();
  const initialmodalFormData: MaterialResource = {
    id: null,
    category: "",
    content: "",
    cover: "",
    description: "",
    source: "",
    title: "",
    type: "Video",
  };
  const { data, isLoading } = useMaterialResourcesQuery("Video");
  const { mutate: editVideoMaterial } = useEditMaterialMutation();
  const { mutate: createVideoMaterial } = useCreateMaterialMutation();
  const [search, setSearch] = useState("");

  const openDialog = () => {
    setModalFormData(initialmodalFormData); // Reset form data
    onOpen();
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
        type: "Video",
      };
      editVideoMaterial(editPayload);
    } else {
      const createPayload = {
        category: modalFormData.category,
        content: modalFormData.content,
        cover: modalFormData.cover,
        description: modalFormData.description,
        source: modalFormData.source,
        title: modalFormData.title,
        type: "Video",
      };
      createVideoMaterial(createPayload);
    }
  };
  return (
    <>
      {" "}
      <Toaster richColors position="top-right" />
      <h3 className="text-primary font-bold text-2xl mb-6">
        Video Material Resource
      </h3>
      <div className="flex justify-between mb-2 items-center">
        <div className="relative w-2/5">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

          <Input
            placeholder="Search Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant={"default"} size={"default"} onClick={openDialog}>
          Add Material
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
            <DialogTitle>Material Resource Video</DialogTitle>
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
                Title <span className="text-red-500">*</span>
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
                Content <span className="text-red-500">*</span>
              </label>
              <Input
                id="content"
                name="content"
                type="text"
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
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category <span className="text-red-500">*</span>
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
                Source <span className="text-red-500">*</span>
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

export default VideoMaterial;
