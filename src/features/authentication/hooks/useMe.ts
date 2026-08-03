import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.service";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
