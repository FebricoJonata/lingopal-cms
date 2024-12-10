"use client";

import { User } from "@/types/user";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

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
