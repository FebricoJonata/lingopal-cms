"use client";

import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { MaterialResource } from "@/types/material-resource";

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
          source: materialResource.source,
          cover: materialResource.cover,
          content: materialResource.content,
          description: materialResource.description,
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
