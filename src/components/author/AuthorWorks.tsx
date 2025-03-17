import { useParams } from "react-router-dom";

export default function AuthorWorks() {
  const { username } = useParams<"username">();
  return <section>{username}</section>;
}
