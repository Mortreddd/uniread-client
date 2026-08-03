import { useSearchPublicUsers } from "@/features/users/hooks/useSearchPublicUsers";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertContext";
import { getDirectConversation } from "../api/chat.service";
import { memo } from "react";

interface SearchUserResultProps {
  query: string;
}

function SearchUserResult({ query }: SearchUserResultProps) {
  if (!query?.trim()) return null;

  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    error,
  } = useSearchPublicUsers({ query, pageNo: 0, pageSize: 10 });

  if (isLoading) return <LoadingSkeleton />;
  if (error || !users) return <ErrorMessage error={error} />;
  const isEmpty = users.empty;

  if (isEmpty) return <EmptyResult />;

  const handleUserClick = async (receiverId: string) => {
    try {
      const conversation = await getDirectConversation(receiverId);

      if (!conversation?.id) {
        showAlert("Failed to open conversation", "error");
        return;
      }

      navigate(`/chats/${conversation.id}`);
    } catch (error) {
      showAlert("Something went wrong", "error");
      console.error("Failed to start conversation:", error);
    }
  };

  return (
    <div className="absolute top-full left-0 w-full mt-1 z-30 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 rounded-md shadow-lg">
      {users.content.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => handleUserClick(user.id)}
        >
          <img
            src={user.avatarUrl}
            alt={user.displayName}
            className="size-8 md:size-10 lg:size-12 object-cover border border-primary rounded-full flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-medium font-sans text-tiny lg:text-sm text-gray-800 dark:text-gray-200">
              {user.displayName}
            </span>
            <span className="font-sans font-extratiny lg:text-xs text-gray-700 dark:text-gray-300">
              {user.username}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="absolute top-full left-0 w-full mt-1 z-50 bg-white dark:bg-gray-800 p-2 rounded-md shadow">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>
  );
}

function ErrorMessage({ error }: { error: any }) {
  return (
    <div className="absolute top-full left-0 w-full mt-1 z-50 bg-white dark:bg-gray-800 p-2 rounded-md shadow text-center">
      <p className="text-red-500">
        {error.message || "An error occurred while searching for users."}
      </p>
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="absolute top-full left-0 w-full mt-1 z-50 bg-white dark:bg-gray-800 p-2 rounded-md shadow text-center">
      <p className="font-sans text-gray-800 dark:text-gray-200 text-tiny lg:text-sm">
        No results
      </p>
    </div>
  );
}

export default memo(SearchUserResult);
