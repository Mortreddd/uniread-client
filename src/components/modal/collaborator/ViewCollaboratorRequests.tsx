import { forwardRef, Ref, useMemo, useState } from "react";
import Modal, { ModalRef } from "../Modal";
import {
  CollaboratorRequestStatus,
  CollaboratorRequest as CollaboratorRequestType,
} from "@/types/Collaborator";
import { PaginateParams } from "@/types/Pagination";
import { useToast } from "@/contexts/ToastContext";
import { formatDateWithTime } from "@/utils/Dates";
import Icon from "@/components/Icon";
import { Button } from "@/components/common/form/Button";
import useGetBookCollaboratorRequests from "@/api/collaborator/useGetBookCollaboratorRequests";
import LoadingCircle from "@/components/LoadingCirlce";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Error";

interface ViewCollaboratorRequests {
  bookId: string;
}

function ViewCollaboratorRequests(
  { bookId }: ViewCollaboratorRequests,
  ref: Ref<ModalRef>
) {
  const [{ pageNo, pageSize }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });

  const { showToast } = useToast();

  const { data, loading } = useGetBookCollaboratorRequests({
    bookId,
    pageNo,
    pageSize,
  });

  const requests = useMemo(() => {
    if (!data?.content) return [];

    return data.content;
  }, [data?.content]);
  const [showMessages, setShowMessages] = useState<CollaboratorRequestType[]>(
    []
  );

  function onToggleShow(request: CollaboratorRequestType) {
    if (Object.keys(request).includes("message")) {
      setShowMessages((prev) => prev.filter((c) => c.id !== request.id));
    } else {
      setShowMessages((prev) => [...prev, request]);
    }
  }

  async function onAction(
    request: CollaboratorRequestType,
    status: CollaboratorRequestStatus
  ) {
    await api
      .put(`/books/${bookId}/collaboration-requests/${request.id}`, {
        status,
      })
      .then((response: AxiosResponse<CollaboratorRequestType>) => {
        requests.map((r) => {
          return r.id === response.data.id ? { ...response.data } : r;
        });
        showToast("Request approved successfully", "success");
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        showToast(
          error.response?.data.message || "Failed to approve request",
          "error"
        );
      });
  }

  async function onApprove(request: CollaboratorRequestType) {
    // Handle approval logic
    await onAction(request, CollaboratorRequestStatus.ACCEPTED);
  }

  async function onDecline(request: CollaboratorRequestType) {
    // Handle decline logic
    await onAction(request, CollaboratorRequestStatus.REJECTED);
  }

  return (
    <Modal ref={ref}>
      <div className="relative isolate p-3 min-w-xl">
        <h1 className="text-2xl font-bold mb-4">Collaboration Requests</h1>
        <div className="min-h-72 max-h-96 overflow-y-auto space-y-4">
          {loading ? (
            <LoadingCircle />
          ) : data?.content.length === 0 ? (
            <p>No collaboration requests found.</p>
          ) : (
            requests.map((request) => (
              <CollaboratorRequest
                key={request.id}
                request={request}
                onApprove={() => onApprove(request)}
                onDecline={() => onDecline(request)}
                onToggleShow={() => onToggleShow(request)}
                shownMessages={showMessages}
              />
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(ViewCollaboratorRequests);

interface CollaboratorRequestProps {
  request: CollaboratorRequestType;
  onApprove: () => void;
  onDecline: () => void;
  onToggleShow: (request: CollaboratorRequestType) => void;
  shownMessages: CollaboratorRequestType[];
}

function CollaboratorRequest({
  request,
  onApprove,
  onDecline,
  onToggleShow,
  shownMessages,
}: CollaboratorRequestProps) {
  function isShown() {
    return shownMessages.includes(request);
  }

  function getStatus(status: CollaboratorRequestStatus) {
    switch (status) {
      case CollaboratorRequestStatus.PENDING:
        return "bg-amber-600 text-white px-2 py-0.5 rounded-full";
      case CollaboratorRequestStatus.REJECTED:
        return "bg-red-600 text-white px-2 py-0.5 rounded-full";
      case CollaboratorRequestStatus.ACCEPTED:
        return "bg-green-600 text-white px-2 py-0.5 rounded-full";
    }
  }

  const statusText = (status: CollaboratorRequestStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLocaleLowerCase();
  };

  return (
    <figure className="rounded flex border p-3">
      <Icon className={""} size={"lg"} />
      <div className="flex-1 flex justify-between">
        <figcaption className="text-left font-serif ml-3">
          <h6 className="text-xl font-medium text-gray-800">
            {request.user.fullName}{" "}
            <span className={"text-xs font-serif " + getStatus(request.status)}>
              {statusText(request.status)}
            </span>
          </h6>
          <p className="text-sm text-gray-500">
            Requested on {formatDateWithTime(new Date(request.createdAt))}
          </p>
          <p
            className={`truncate text-elliipsis ${
              !request.message || isShown() ? "" : "line-clamp-1"
            } text-wrap transition-all duration-200 ease-in-out`}
          >
            {request.message ? request.message : "No message provided."}
          </p>
          {request.message && (
            <button
              className={
                "text-gray-800 text-sm font-serif transition-all duration-200 ease-in-out hover:text-gray-500 cursor-pointer"
              }
              onClick={() => onToggleShow(request)}
            >
              {isShown() ? "Show Less" : "Show More"}
            </button>
          )}
        </figcaption>
        {request.status === CollaboratorRequestStatus.PENDING && (
          <div className="relative space-y-2 max-w-28">
            <Button
              onClick={onApprove}
              variant={"success"}
              className={"w-full rounded"}
            >
              Accept
            </Button>
            <Button
              onClick={onDecline}
              variant={"danger"}
              className={"w-full rounded"}
            >
              Decline
            </Button>
          </div>
        )}
      </div>
    </figure>
  );
}
