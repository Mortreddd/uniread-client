import { TableColumn } from "@/shared/components/types/Table";
import Table from "@/shared/components/table/Table";
import { GenreDetail } from "../types/Genre";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { ModalRef } from "@/shared/components/Modal";
import UpdateGenreModal from "./modals/UpdateGenreModal";

interface GenreDetailTableProps {
  genres: GenreDetail[];
}

export default function GenreDetailTable({ genres }: GenreDetailTableProps) {
  const [genreDetails, setGenreDetails] = useState<GenreDetail[]>(genres);
  const [selectedGenre, setSelectedGenre] = useState<GenreDetail | null>(null);
  const updateGenreModalRef = useRef<ModalRef>(null);
  const columns: TableColumn<GenreDetail>[] = [
    {
      key: "genre",
      header: "Genre Name",
      render: (genre) => (
        <span className="text-left text-xs lg:text-sm text-sky-800 dark:text-sky-800">
          {genre.name}
        </span>
      ),
    },

    {
      key: "description",
      header: "Description",
      render: (genre) => (
        <span className="text-left text-xs lg:text-sm text-gray-800 dark:text-gray-100 truncate">
          {genre.description}
        </span>
      ),
    },

    {
      key: "bookCount",
      header: "Associated Books",
      render: (genre) => (
        <span className="text-right text-xs lg:text-sm text-gray-800 dark:text-gray-100 truncate">
          {genre.bookCount}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (genre) => (
        <PencilIcon
          onClick={() => {
            setSelectedGenre(genre);
            setTimeout(() => {
              updateGenreModalRef.current?.open();
            }, 0);
          }}
          className={
            "size-3 lg:size-4 text-gray-800 dark:text-gray-200 hover:scale-110 cursor-pointer transition-all duration-200 ease-in-out"
          }
        />
      ),
    },
  ];

  useEffect(() => {
    setGenreDetails(genres);
  }, [genres]);

  function onUpdate(updatedGenre: GenreDetail) {
    setGenreDetails((prev) =>
      prev.map((genre) =>
        genre.id === updatedGenre.id ? updatedGenre : genre,
      ),
    );
    updateGenreModalRef.current?.close();
    setSelectedGenre(null);
  }
  return (
    <>
      <Table
        data={genreDetails}
        columns={columns}
        getRowKey={(genre) => genre.id}
        emptyMessage="No genres found."
      />
      {selectedGenre && (
        <UpdateGenreModal
          ref={updateGenreModalRef}
          genre={selectedGenre}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
