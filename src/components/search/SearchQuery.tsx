import { Input } from "@/components/common/form/Input.tsx";
import { Button } from "@/components/common/form/Button.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import DropdownContent, {
  DropdownContentRef,
} from "@/components/common/dropdown/DropdownContent.tsx";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce.ts";
import axios, { AxiosError, AxiosResponse } from "axios";
import api from "@/services/ApiService.ts";
import { Paginate, RequestState } from "@/types/Pagination.ts";
import { Book } from "@/types/Book.ts";
import SearchResult from "./SearchResult";

/**
 * The component for search bar in home page
 * @constructor
 */
function SearchQuery() {
  const dropdownContentRef = useRef<DropdownContentRef>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";
  const navigate = useNavigate();
  const debounceSearch = useDebounce(query, 500);

  const [result, setResult] = useState<RequestState<Paginate<Book[]>>>({
    data: null,
    loading: false,
    error: null,
  });

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim().length <= 0) {
      searchInputRef.current?.focus();
      return;
    }
    navigate(`/search/all?query=${query}`);
  }

  function handleSearchQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setParams({ query: e.target.value });
  }

  useEffect(() => {
    const controller = new AbortController();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    async function getBookResults() {
      if (debounceSearch.trim().length <= 0) {
        setResult({
          data: null,
          error: null,
          loading: false,
        });
        return;
      }
      console.log(debounceSearch);

      setResult((prev) => ({ ...prev, loading: true }));
      api
        .get("/books", {
          params: {
            pageNo: 0,
            pageSize: 5,
            query: debounceSearch,
          },
          cancelToken: source.token,
        })
        .then((response: AxiosResponse<Paginate<Book[]>>) => {
          setResult({
            data: response.data,
            error: null,
            loading: false,
          });
          console.log(response.data.content);
        })
        .catch((error: AxiosError) => {
          setResult({
            data: null,
            error: error.message,
            loading: false,
          });
          console.log(error);
        });
    }

    getBookResults();

    return () => {
      controller.abort();
      source.cancel("Cancelled request");
    };
  }, [debounceSearch]);

  return (
    <div className="relative">
      <form
        onSubmit={handleSearchSubmit}
        className="inline-flex items-center border-2 h-fit rounded-lg border-primary"
      >
        {/*
         * Add the form for search input
         *
         */}
        <Input
          ref={searchInputRef}
          onChange={handleSearchQueryChange}
          type="search"
          value={query}
          variant={"none"}
          className={
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
          }
          placeholder="eg: genre, book"
        />

        <Button variant={"primary"} type={"submit"} className="p-2">
          <MagnifyingGlassIcon className="text-white size-4" />
        </Button>
      </form>
      <DropdownContent
        ref={dropdownContentRef}
        className={`w-72 ${result?.data?.content.length ? "block" : "hidden"}`}
      >
        {result.data?.content.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id}>
            <SearchResult book={book} className={"w-full h-fit"} />
          </Link>
        ))}
      </DropdownContent>
    </div>
  );
}

export default SearchQuery;
