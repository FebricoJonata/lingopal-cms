import { User } from "@/types/user/user";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(
      "https://lingo-pal-backend-v1.vercel.app/api/users"
    );

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    // Parse the response body as JSON
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
    return [];
  }
};
