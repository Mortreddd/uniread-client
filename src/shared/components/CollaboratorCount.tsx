import { UsersIcon } from "@heroicons/react/24/outline";

interface CollaboratorCountProps {
  count: number;
}
export default function CollaboratorCount({
  count = 4,
}: CollaboratorCountProps) {
  return (
    <div
      className={
        "inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
      }
    >
      <UsersIcon className={"size-4 md:size-5"} />
      <span>
        {count} {count <= 1 ? "Collaborator" : "Collaborators"}
      </span>
    </div>
  );
}
