import { useAuth } from "@/contexts/AuthContext";
import AuthorInfo from "./AuthorInfo";
import { User } from "@/types/User";
import { useMemo } from "react";

interface AuthorSearchedProps {
  users?: User[];
}

export default function AuthorSearched({ users }: AuthorSearchedProps) {
  const { user } = useAuth();
  const filteredUsers = useMemo(
    () => users?.filter((u) => u.id !== user?.id),
    [users, user]
  );

  return (
    <article className="grid grid-cols-2 grid-flow-row gap-3 md:gap-4 w-full rounded-lg">
      {filteredUsers?.map((user, key) => (
        <AuthorInfo key={key} user={user} className={"col-span-1"} />
      ))}
    </article>
  );
}
