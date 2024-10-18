export interface User {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  image?: string | null;
}
