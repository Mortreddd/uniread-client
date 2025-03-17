import { useSearchParams } from "react-router-dom";

export default function SearchAll() {
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  return (
    <>
      <div className="text-2xl font-medium">Search All {query}</div>
    </>
  );
}
