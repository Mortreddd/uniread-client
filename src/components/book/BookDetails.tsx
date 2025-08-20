import BookDetail from "@/components/book/BookDetail";
import { Button } from "../common/form/Button";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { useRef } from "react";
import LoginModal from "../common/modal/auth/LoginModal";
import { useNavigate } from "react-router-dom";
import { ModalRef } from "../common/modal/Modal";
import { Book } from "@/types/Book";
import LoadingCircle from "../LoadingCirlce";

interface BookDetailsProps {
  book?: Book | null;
}

export default function BookDetails({ book }: BookDetailsProps) {
  const loginModalRef = useRef<ModalRef>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  function handleStartReading() {
    if (!user) {
      loginModalRef.current?.open();
    } else {
      navigate("/");
    }
  }
  return (
    <>
      {!book ? (
        <div className="w-full h-fit min-h-52 flex justify-center items-center">
          <LoadingCircle />
        </div>
      ) : (
        <>
          <LoginModal ref={loginModalRef} />

          <div className="w-full h-fit">
            <BookDetail book={book} />
            <div className="py-2 gap-3 h-fit flex items-center w-auto justify-start">
              <Button
                onClick={handleStartReading}
                className="rounded-full text-sm"
                variant={"primary"}
              >
                <a href={`/books/${book.id}/chapters`}>Start Reading</a>
              </Button>
              <Button
                className="flex items-center gap-2 text-sm rounded-full"
                variant={"info"}
                onClick={handleStartReading}
              >
                <BookmarkIcon className="size-5" />
                Add to library
              </Button>
            </div>
            <p className="w-full mt-3 line-clamp-5 h-full text-gray-500">
              {book.description ?? "The synopsis is empty"}
            </p>
          </div>
        </>
      )}
    </>
  );
}
