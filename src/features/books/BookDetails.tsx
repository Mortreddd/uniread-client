import BookDetail from "@/features/books/BookDetail.tsx";
import { Button } from "@/shared/components/form/Button.tsx";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext.tsx";
import { useRef, useState } from "react";
import LoginModal from "@/features/authentication/LoginModal.tsx";
import { useNavigate } from "react-router-dom";
import { ModalRef } from "../../shared/components/Modal.tsx";
import { BookDetail as BookDetailType } from "@/features/books/types/Book.ts";
import Spinner from "../../shared/components/Spinner.tsx";
import CreateCollaborationRequestModal from "../../components/modal/collaborator/CreateCollaborationRequestModal.tsx";
import { useToast } from "@/contexts/ToastContext.tsx";
import api from "@/core/api/ApiService.ts";

interface BookDetailsProps {
  book?: BookDetailType | null;
}

export default function BookDetails({ book }: BookDetailsProps) {
  const loginModalRef = useRef<ModalRef>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const collaborationModalRef = useRef<ModalRef>(null);
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  function handleStartReading() {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
    } else {
      navigate("/");
    }
  }

  function onCreateCollaborationRequest(isSuccess: boolean) {
    setIsCollaborator(isSuccess);
    collaborationModalRef.current?.close();
  }

  async function handleSaveToLibrary() {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    await api.post(`/profile/${book?.id}`);
  }

  return (
    <>
      {!book ? (
        <div className="w-full h-fit min-h-52 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <LoginModal ref={loginModalRef} />
          <CreateCollaborationRequestModal
            ref={collaborationModalRef}
            bookId={book.id}
            onCreateCollaboratorRequest={onCreateCollaborationRequest}
          />
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
              {book.isSaved ? (
                <Button
                  className="flex items-center gap-2 text-sm rounded-full"
                  variant={"info"}
                  onClick={handleStartReading}
                >
                  <BookmarkIcon className="size-5" />
                  Add to library
                </Button>
              ) : (
                <Button
                  className="flex items-center gap-2 text-sm rounded-full"
                  variant={"warning"}
                >
                  <BookmarkIcon className="size-5" />
                  Remove from library
                </Button>
              )}

              {book.isCollaborator ||
                (isCollaborator && (
                  <Button
                    variant={"warning"}
                    className="rounded-full text-sm"
                    onClick={() => collaborationModalRef.current?.open()}
                  >
                    Collaborate
                  </Button>
                ))}
            </div>
            as
            <p className="w-full mt-3 line-clamp-5 h-full text-gray-500">
              {book.description ?? "The synopsis is empty"}
            </p>
          </div>
        </>
      )}
    </>
  );
}
