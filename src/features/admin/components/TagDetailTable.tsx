import { TableColumn } from "@/shared/components/types/Table";
import Table from "@/shared/components/table/Table";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TagDetail } from "../types/Tag";
import { Formatters } from "@/utils/formatters";
import { useEffect, useRef, useState } from "react";
import { ModalRef } from "@/shared/components/Modal";
import UpdateTagModal from "./modals/UpdateTagModal";

interface TagDetailTableProps {
  tags: TagDetail[];
}

export default function TagDetailTable({ tags }: TagDetailTableProps) {
  const updateTagModalRef = useRef<ModalRef>(null);
  const [tagDetails, setTagDetails] = useState<TagDetail[]>([]);
  const [selectedTag, setSelectedTag] = useState<TagDetail | null>(null);
  useEffect(() => {
    setTagDetails(tags);
  }, [tags]);
  const columns: TableColumn<TagDetail>[] = [
    {
      key: "tag",
      header: "Tag Label",
      render: (tag) => (
        <span className="text-left text-xs lg:text-sm text-sky-800 dark:text-sky-800">
          {tag.name}
        </span>
      ),
    },

    {
      key: "usageCount",
      header: "Usage Count",
      render: (tag) => (
        <span className="text-left text-xs lg:text-sm text-gray-800 dark:text-gray-100 truncate">
          {tag.usageCount}
        </span>
      ),
    },

    {
      key: "createdAt",
      header: "Created Date",
      render: (tag) => (
        <span className="text-right text-xs lg:text-sm text-gray-800 dark:text-gray-100 truncate">
          {Formatters.Date.formatDateOnly(new Date(tag.createdAt))}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (tag) => (
        <PencilIcon
          onClick={() => {
            setSelectedTag(tag);
            setTimeout(() => {
              updateTagModalRef.current?.open();
            }, 0);
          }}
          className={
            "size-3 lg:size-4 text-gray-800 dark:text-gray-200 hover:scale-110 cursor-pointer transition-all duration-200 ease-in-out"
          }
        />
      ),
    },
  ];

  function onUpdate(updatedTag: TagDetail) {
    setTagDetails((prev) =>
      prev.map((_tag) => {
        return _tag.id === updatedTag.id ? updatedTag : _tag;
      }),
    );

    updateTagModalRef.current?.close();
    setSelectedTag(null);
  }

  return (
    <>
      <Table
        data={tagDetails}
        columns={columns}
        getRowKey={(tag) => tag.id}
        emptyMessage="No tags found."
      />
      {selectedTag && (
        <UpdateTagModal
          ref={updateTagModalRef}
          tag={selectedTag}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
