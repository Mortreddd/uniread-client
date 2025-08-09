import { useBookChapter } from "@/pages/ReadingPage";

export default function ViewChapter() {
  const data = useBookChapter();

  console.log(data);

  if (!data.chapter) return null;

  return (
    <div>
      <h1>Chapter {data.chapter?.title ?? "The title is null"}</h1>
    </div>
  );
}
