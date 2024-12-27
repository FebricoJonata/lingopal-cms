"use client";

import { User } from "@/types/user";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useUserQuery = () => {
  const fetchUsers = async ({ queryKey }: QueryFunctionContext) => {
    try {
      const response = await fetch(
        "https://lingo-pal-backend-v1.vercel.app/api/users"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data = await response.json();

      const users = data.body.data.map((user: User, idx: number) => ({
        idx: idx + 1,
        user_id: user.user_id,
        name: user.name || "-",
        email: user.email || "-",
        phone_number: user.phone_number || "-",
        birth_date: user.birth_date || "-",
        gender: user.gender || "-",
        image: user.image,
      }));

      console.log("Users: ", users);
      return users;
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  return useQuery({
    queryKey: ["users-list"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loginPayload: {}) => {
      const response = await axios.post(
        `https://lingo-pal-backend-v1.vercel.app/api/users/admin-signin`,
        loginPayload
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Successfully Login!");
    },
    onError: (error: any) => {
      toast.error("Invalid Crendentials.");
      throw new Error("Invalid Crendentials.");
    },
  });
};
