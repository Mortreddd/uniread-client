import { useQuery } from "@tanstack/react-query";
import { getUserBooks } from "../api/user-book.service";
import { UserBookFilter } from "../types/UserBook";

export function usePersonalBooks(filter: UserBookFilter) {
  return useQuery({
    queryKey: ["personal-books"],
    queryFn: () => getUserBooks(filter),
  });
}
