import api from "@/services/ApiService";
import { Reaction } from "@/types/Enums";
import { ErrorResponse } from "@/types/Error";
import { SuccessResponse } from "@/types/Success";
import { AxiosError, AxiosResponse } from "axios";
import { useRef } from "react";

export default function useReaction() {
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Create any reaction for given url and give delay by 2 seconds
   * @param url
   * @param reaction
   */
  function createReaction(url: string, reaction: Reaction) {
    if (timeRef.current) clearTimeout(timeRef.current);

    timeRef.current = setTimeout(async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      await api
        .post(
          url,
          {
            reaction,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            signal,
          }
        )
        .then((result) => console.log(result))
        .catch((error: AxiosError<ErrorResponse>) => console.error(error));
    }, 2000); // 2 seconds
  }

  function removeReaction(url: string) {
    if (timeRef.current) clearTimeout(timeRef.current);

    timeRef.current = setTimeout(async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      await api
        .delete(url, { signal })
        .then((result: AxiosResponse<SuccessResponse>) => console.log(result))
        .catch((error: AxiosError<ErrorResponse>) => console.error(error));
    }, 2000); // 2 seconds
  }

  return { removeReaction, createReaction } as const;
}
