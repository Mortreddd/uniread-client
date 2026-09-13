import api from "@/core/api/ApiService";

export const getTotalUnreadMessages = async () => {
  const response = await api.get<{ totalUnreadMessages: number }>(
    "/messages/unread-count",
  );
  return response.data.totalUnreadMessages;
};
