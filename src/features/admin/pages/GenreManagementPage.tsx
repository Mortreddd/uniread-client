import { useMemo, useRef, useState } from "react";
import { Input } from "@/shared/components/form/Input";
import { GenreDetail, GenreTableFilter } from "../types/Genre";
import GenreDetailTable from "../components/GenreDetailTable";
import { Button } from "@/shared/components/form/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddGenreModal from "../components/modals/AddGenreModal";
import { ModalRef } from "@/shared/components/Modal";
import { useGetGenreDetails } from "../hooks/useGenre";

export default function GenreManagementPage() {
  return (
    <main className="p-5 lg:p-10 relative flex flex-col flex-1 min-h-0">
      <h1 className="text-gray-800 font-newsreader text-lg lg:text-2xl md:text-xl dark:text-gray-200 tracking-tight">
        Genre Management
      </h1>
      <p className="text-xs md:text-sm lg:text-base font-sans text-gray-700 dark:text-gray-300 mb-3 lg:mb-5">
        Organize and define the literacy classifications used across the UniRead
        ecosystem. Changes here will immediately reflect in content tagging and
        user discovery features.
      </p>
      <div className="py-4 md:py-6">
        <GenreTable />
      </div>
    </main>
  );
}

function GenreTable() {
  const createGenreModalRef = useRef<ModalRef>(null);
  const [filter] = useState<GenreTableFilter>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });

  const { data, refetch } = useGetGenreDetails(filter);

  const genreDetails = useMemo(() => {
    if (!data || data.empty) return [];

    return data.content;
  }, [data]);

  function onCreate(_: GenreDetail) {
    createGenreModalRef.current?.close();
    refetch();
  }

  return (
    <div className="relative">
      <div className="flex gap-2 justify-between lg:gap-3 items-center mb-2 lg:mb-3 rounded bg-gray-200 dark:bg-slate-800 p-1.5 lg:p-2">
        <div className="inline-flex items-center">
          <Input withSearch={true} placeholder={"Search genres..."} />
        </div>
        <AddGenreModal ref={createGenreModalRef} onCreate={onCreate} />
        <Button
          onClick={() => {
            createGenreModalRef.current?.open();
          }}
          className={"rounded"}
        >
          <PlusIcon className={"size-3 lg:size-4 text-gray-200"} />
          <span className={"text-tiny lg:text-xs text-gray-200"}>
            New Genre
          </span>
        </Button>
      </div>
      <GenreDetailTable genres={genreDetails} />
    </div>
  );
}
