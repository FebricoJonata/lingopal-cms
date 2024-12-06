"use client";

import { Question } from "@/types/question";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useQuestionQuery = (courseCategoryID: 1 | 2) => {
  const fetchQuestion = async ({ queryKey }: QueryFunctionContext) => {
    try {
      const [_, courseCategoryID] = queryKey as [string, number];

      const response = await fetch(
        `https://lingo-pal-backend-v1.vercel.app/api/quiz/admin?course_category_id=${courseCategoryID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch : ${response.statusText}`);
      }

      const data = await response.json();

      const questions: Question[] = data.data.map(
        (question: Question, idx: number) => ({
          idx: idx + 1,
          quiz_id: question.quiz_id,
          question: question.question,
          answer_key: question.answer_key,
          choices: question.choices,
          course_name: question.course_name,
          course_description: question.course_description,
          practice_code: question.practice_code,
          practice_id: question.practice_id,
        })
      );

      console.log("Question: ", questions);
      return questions;
    } catch (error) {
      console.error("Error fetching question: ", error);
    }
  };

  return useQuery({
    queryKey: ["questions", courseCategoryID],
    queryFn: fetchQuestion,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreateQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createPayload: {}) => {
      const response = await axios.post(
        `https://lingo-pal-backend-v1.vercel.app/api/quiz/admin/create`,
        createPayload
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question has been created!");
    },
    onError: (error: any) => {
      toast.error("Failed to create question.");
      throw new Error("Failed to create question.");
    },
  });
};

export const useEditQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (editPayload: {}) => {
      const response = await axios.put(
        `https://lingo-pal-backend-v1.vercel.app/api/quiz/admin/update`,
        editPayload
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question has been updated!");
    },
    onError: (error: any) => {
      toast.error("Failed to update question.");
      throw new Error("Failed to update question.");
    },
  });
};

export const useDeleteQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(
        `https://lingo-pal-backend-v1.vercel.app/api/quiz/admin/delete/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question deleted successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to delete question.");
      throw new Error("Failed to delete question.");
    },
  });
};
