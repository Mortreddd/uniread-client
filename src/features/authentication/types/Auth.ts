import { Gender } from "@/features/users/types/User";

export interface RegisterFormProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: Gender;
  password: string;
  confirmPassword: string;
}
