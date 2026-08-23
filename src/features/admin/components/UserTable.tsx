import { TableColumn } from "@/shared/components/types/Table";
import { UserTableDetail } from "../types/UserTable";
import defaultProfile from "@/assets/profiles/default-profile.jpg";
import Table from "@/shared/components/table/Table";
import { Button } from "@/shared/components/form/Button";
import { Formatters } from "@/utils/formatters";

interface UserTableProps {
  users: UserTableDetail[];
}

export default function UserTable({ users }: UserTableProps) {
  const columns: TableColumn<UserTableDetail>[] = [
    {
      key: "user",
      header: "User",
      render: (user) => (
        <div className="flex items-center gap-3">
          <img
            src={user.profile.avatarUrl ?? defaultProfile}
            alt={user.username}
            className="size-10 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="font-medium truncate text-gray-800 dark:text-gray-100">
              {user.profile.displayName}
            </p>

            <p className="text-sm text-gray-500 truncate">@{user.username}</p>
          </div>
        </div>
      ),
    },

    {
      key: "email",
      header: "Email",
      render: (user) => (
        <span className="text-sm text-gray-800 dark:text-gray-100">
          {user.email}
        </span>
      ),
    },

    {
      key: "role",
      header: "Role",
      render: (user) => (
        <span className="rounded-full text-gray-800 dark:text-gray-100 bg-primary/10 px-2 py-1 text-xs">
          {""}
        </span>
      ),
    },
    {
      key: "registered",
      header: "Registered Date",
      render: (user) => (
        <span className="rounded-full text-gray-800 dark:text-gray-100 bg-primary/10 px-2 py-1 text-xs">
          {Formatters.Date.formatRelativeDate(new Date(user.createdAt))}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user) => (
        <Button className={"rounded"}>
          <span className="text-sm lg:text-base text-gray-200 hover:underline">
            Edit
          </span>
        </Button>
      ),
    },
  ];

  return (
    <Table
      data={users}
      columns={columns}
      getRowKey={(user) => user.id}
      emptyMessage="No users found."
    />
  );
}
