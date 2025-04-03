import { Follow } from "@/types/Follow.ts";
import { forwardRef, Ref, useState } from "react";
import Modal, { ModalRef } from "../Modal.tsx";
import useGetUserFollowers from "@/api/follow/useGetUserFollowers.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import AuthorFollowInfo from "@/components/author/AuthorFollowInfo.tsx";

interface FollowModalProps {
  authorId: string | undefined;
}
function FollowerModal({ authorId }: FollowModalProps, ref: Ref<ModalRef>) {
  const [{ pageNo, pageSize, query }, setState] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });

  /**
   * Get the followers of author
   */
  const { data, loading } = useGetUserFollowers({
    userId: authorId,
    pageNo,
    pageSize,
    query,
  });

  const [follows, setFollows] = useState<Follow[]>(data?.content ?? []);

  function onBottomReached() {
    if (data?.last) return;

    setState(({ pageNo }) => {
      return {
        pageNo: (pageNo ?? 0) + 1,
      };
    });
  }

  return (
    <Modal ref={ref}>
      <div className="w-full h-fit">
        <h1 className="text-2xl text-center my-4">Followers</h1>
        <div className="flex flex-col items-start w-full divide-y-2 overflow-y-auto">
          <div className="bg-gray-100 rounded px-4 py-2 w-full">
            {loading && <LoadingCircle />}
            {follows.map((follow, index) => (
              <AuthorFollowInfo key={index} follow={follow} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(FollowerModal);
