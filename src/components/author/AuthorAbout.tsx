import { useParams } from "react-router-dom";

export default function AuthorAbout() {
  const { username } = useParams<"username">();
  console.log(username);
  return <section>Hello</section>;
}
