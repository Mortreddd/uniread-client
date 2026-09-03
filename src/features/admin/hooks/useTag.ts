import { useMutation, useQuery } from "@tanstack/react-query";
import { createTag, getTagDetails, updateTag } from "../api/tag.service";
import { TagTableFilter } from "../types/Tag";

export const useGetTagDetails = (params: TagTableFilter) => {
  return useQuery({
    queryKey: ["tagDetails", params],
    queryFn: () => getTagDetails(params),
    enabled: !!params,
    staleTime: 0,
  });
};

export const useCreateTagMutation = () => {
  return useMutation({
    mutationFn: (newTag: { name: string }) => createTag(newTag),
  });
};

export const useUpdateTagMutation = () => {
  return useMutation({
    mutationFn: (tag: { id: string; name: string }) => updateTag(tag),
  });
};
