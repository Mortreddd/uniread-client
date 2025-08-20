import { forwardRef, Ref, useMemo, useState } from "react";
import Modal, { ModalRef } from "../Modal";
import { Notification } from "@/types/Notification";
import useGetUserNotifications from "@/api/notification/useGetUserNotifications";
import { PaginateParams } from "@/types/Pagination";
import NotificationRow from "@/components/notification/NotificationRow";
import LoadingCircle from "@/components/LoadingCirlce";

interface NotificationsModalProps {
  notificaiton?: Notification[];
}

function NotificationsModal({}: NotificationsModalProps, ref: Ref<ModalRef>) {
  const [{ pageNo, pageSize }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });

  const { data, loading } = useGetUserNotifications({ pageNo, pageSize });
  const memoizedNotifications = useMemo(() => {
    if (!data?.content) return [];

    return data.content;
  }, [data?.content]);

  return (
    <Modal ref={ref} className={"min-h-96 min-w-xl"}>
      <h1 className="text-2xl font-serif font-thin">Notifications</h1>
      <div className="mt-5">
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingCircle />
          </div>
        ) : memoizedNotifications.length > 0 ? (
          memoizedNotifications.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <div className={"text-center"}>No notifications found.</div>
        )}
      </div>
    </Modal>
  );
}

export default forwardRef(NotificationsModal);
