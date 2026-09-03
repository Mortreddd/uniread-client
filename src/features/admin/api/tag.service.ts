import { Paginate } from "@/types/Pagination";
import api from "@/core/api/ApiService";
import TableDetailFilter, { TagDetail } from "@/features/admin/types/Tag";

export const getTagDetails: (
  params: TableDetailFilter,
) => Promise<Paginate<TagDetail[]>> = async ({ ...params }) => {
  const response = await api.get<Paginate<TagDetail[]>>("/admin/tags", {
    params,
  });

  return response.data;
};

export const createTag = async (newTag: { name: string }) => {
  try {
    const response = await api.post<TagDetail>("/admin/tags", newTag);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateTag = async (tag: { id: string; name: string }) => {
  const payload = { name: tag.name };
  try {
    const response = await api.put<TagDetail>(`/admin/tags/${tag.id}`, payload);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
