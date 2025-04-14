import {NavLink, Outlet, useOutletContext} from "react-router-dom";
import useGetUserBooks from "@/api/books/useGetUserBooks.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useMemo, useState} from "react";
import {PaginateParams} from "@/types/Pagination.ts";
import {Book} from "@/types/Book.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";

interface UserStories {
    books: Book[];
}

export default function MyStoriesSection() {
    const { user: currentUser } = useAuth();
    const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
        pageNo: 0,
        pageSize: 10,
        query: ""
    })
    const { data, loading } = useGetUserBooks({ userId: currentUser?.id, pageNo, pageSize, query })
    const memoizedBooks : Book[] = useMemo(() => {
        if(!data?.content) return []

        return data.content
    }, [data])

  return (
    <div className="h-fit w-2/4">
      <h1 className="block text-3xl mb-4 font-sans text-gray-700 font-semibold">
        My Stories
      </h1>
        <div className={"w-full block h-fit border-t border-l border-r border-b-0 border-primary rounded-t"}>
            <div className="flex w-full items-center px-3 gap-4 justify-start">
                <NavLink
                    to={"/stories/published"}
                    className={({isActive}) =>
                        `${
                            isActive
                                ? "border-b-2 border-solid border-primary text-primary"
                                : "text-black"
                        } text-xl font-semibold py-3`
                    }
                >
                    Published
                </NavLink>
                <NavLink
                    to={"/stories/drafts"}
                    className={({isActive}) =>
                        `${
                            isActive
                                ? "border-b-2 border-solid border-primary text-primary"
                                : "text-black"
                        } text-xl font-semibold py-3 text-black`
                    }
                >
                    Drafts
                </NavLink>
            </div>
        </div>
        <div className="relative block w-full border shadow border-primary h-96 overflow-y-auto">

            <div className="relative w-full h-full p-3">
                {loading && !data?.content ? (
                    <div className={'w-full h-full flex items-center justify-center'}>
                        <LoadingCircle size={'md'}/>
                    </div>
                ) : (
                    <Outlet context={{books: memoizedBooks} satisfies UserStories}/>
                )}
            </div>
        </div>
    </div>
  );
}


/**
 * function for using the context in child components
 * @return context of user stories
 */
export function useUserStories() {
    return useOutletContext<UserStories>()
}
