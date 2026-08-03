import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/user-profile.service";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
  });
};
