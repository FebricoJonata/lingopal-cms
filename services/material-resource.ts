"use client";

// import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { MaterialResource } from "@/types/material-resource";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useMaterialResourcesQuery = (contentType: "Video" | "Article") => {
  const fetchMaterialResources = async ({ queryKey }: QueryFunctionContext) => {
    try {
      const [_, contentType] = queryKey as [string, string];

      const response = await fetch(
        `https://lingo-pal-backend-v1.vercel.app/api/material-resource?type=${contentType}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch : ${response.statusText}`);
      }

      const data = await response.json();

      const materialResources: MaterialResource[] = data.body.map(
        (materialResource: MaterialResource, idx: number) => ({
          idx: idx + 1,
          id: materialResource.id,
          title: materialResource.title,
          type: materialResource.type,
          category: materialResource.category,
          source: materialResource.source?.includes(")")
            ? materialResource.source.split(")")[1].trim()
            : materialResource.source,
          cover: materialResource.cover,
          content: materialResource.content?.includes(")")
            ? materialResource.content.split(")")[1].trim()
            : materialResource.content,
          description: materialResource.description || "-",
        })
      );

      console.log("Material Resource : ", materialResources);
      return materialResources;
    } catch (error) {
      console.error("Error fetching question: ", error);
    }
  };

  return useQuery({
    queryKey: ["material-resource", contentType],
    queryFn: fetchMaterialResources,
  });
};

export const useCreateMaterialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createPayload: {}) => {
      const response = await axios.post(
        `https://lingo-pal-backend-v1.vercel.app/api/material-resource/admin/create`,
        createPayload
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-resource"] });
      toast.success("Material has been created!");
    },
    onError: (error: any) => {
      toast.error("Failed to create material.");
      throw new Error("Failed to create material.");
    },
  });
};
export const useDeleteMaterialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(
        `https://lingo-pal-backend-v1.vercel.app/api/material-resource/admin/delete/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-resource"] });
      toast.success("Material deleted successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to delete material.");
      throw new Error("Failed to delete material.");
    },
  });
};
export const useEditMaterialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (editPayload: {}) => {
      const response = await axios.put(
        `https://lingo-pal-backend-v1.vercel.app/api/material-resource/admin/update`,
        editPayload
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-resource"] });
      toast.success("Material has been updated!");
    },
    onError: (error: any) => {
      toast.error("Failed to update Material.");
      throw new Error("Failed to update Material.");
    },
  });
};
