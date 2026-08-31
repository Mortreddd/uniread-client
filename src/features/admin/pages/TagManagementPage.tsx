import { Input } from "@/shared/components/form/Input";
import { Button } from "@/shared/components/form/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import TagDetailTable from "../components/TagDetailTable";
import { useMemo, useRef, useState } from "react";
import { ModalRef } from "@/shared/components/Modal";
import AddTagModal from "../components/modals/AddTagModal";
import { useGetTagDetails } from "../hooks/useTag";
import { PaginateParams } from "@/types/Pagination";
import { TagDetail } from "../types/Tag";

export default function TagManagementPage() {
  return (
    <main className="p-5 lg:p-10 relative flex flex-col flex-1 min-h-0">
      <h1 className="text-gray-800 font-newsreader text-lg lg:text-2xl md:text-xl dark:text-gray-200 tracking-tight">
        Tag Management
      </h1>
      <p className="text-xs md:text-sm lg:text-base font-sans text-gray-700 dark:text-gray-300 mb-3 lg:mb-5">
        Organize and standardize editorial metadata tags across publications.
      </p>
      <div className="py-4 md:py-6">
        <TagTable />
      </div>
    </main>
  );
}

function TagTable() {
  const [filter] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { data, refetch } = useGetTagDetails(filter);
  const tagDetails = useMemo(() => {
    if (!data || data.empty) return [];

    return data.content;
  }, [data]);
  const addTagModalRef = useRef<ModalRef>(null);

  function onCreate(_: TagDetail) {
    addTagModalRef.current?.close();

    refetch();
  }

  return (
    <div className="relative">
      <AddTagModal ref={addTagModalRef} onCreate={onCreate} />
      <div className="flex gap-2 justify-between lg:gap-3 items-center mb-2 lg:mb-3 rounded bg-gray-200 dark:bg-slate-800 p-1.5 lg:p-2">
        <div className="inline-flex items-center">
          <Input withSearch={true} placeholder={"Search tags..."} />
        </div>
        <Button
          onClick={() => addTagModalRef.current?.open()}
          className={"rounded"}
        >
          <PlusIcon className={"size-3 lg:size-4 text-gray-200"} />
          <span className={"text-tiny lg:text-xs text-gray-200"}>New Tag</span>
        </Button>
      </div>
      <TagDetailTable tags={tagDetails} />
    </div>
  );
}
