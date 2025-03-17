import { useSearchParams } from "react-router-dom";
import AuthorSearched from "../author/AuthorSearched";
import useGetUsers from "@/api/user/useGetUsers";
import { useState } from "react";
import { PaginateParams } from "@/types/Pagination";

export default function SearchAuthor() {
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [params, setParams] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 20,
    query: query || "",
  });

  const { data } = useGetUsers(params);

  return (
    <>
      <section className="w-full flex flex-col p-4 md:p-6 h-fit min-h-80 bg-gray-50">
        <AuthorSearched users={data?.content} />
      </section>
    </>
  );
}
