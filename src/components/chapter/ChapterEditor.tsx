import { Chapter } from "@/types/Chapter.ts";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/common/form/Button.tsx";
import { Input } from "@/components/common/form/Input.tsx";
import TextEditor from "@/components/toolbar/TextEditor.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  descendantsToParagraphs,
  Paragraph,
  paragraphsToDescendants,
} from "@/types/Paragraph.ts";
import { Descendant } from "slate";
import { useToast } from "@/contexts/ToastContext.tsx";
import useGetBookChapterParagraphs from "@/api/chapters/useGetBookChapterParagraphs";
import LoadingCircle from "../LoadingCirlce";
import useChapter from "@/hooks/useChapter.ts";

interface ChapterEditorProps {
  chapter: Chapter;
}

interface EditChapterProps {
  title: string;
  paragraphs: Paragraph[];
}

export default function ChapterEditor({ chapter }: ChapterEditorProps) {
  /**
   * Get the chapter data from the API using the bookId and chapterId.
   * The data is used to populate the form fields and the text editor.
   */
  const { showToast } = useToast();
  const { onUpdateChapter } = useChapter({ bookId: chapter.id });
  const { data, loading } = useGetBookChapterParagraphs({
    bookId: chapter.bookId,
    chapterId: chapter.id,
  });

  const EMPTY_CONTENT: Descendant[] = [
    {
      type: "paragraph",
      align: "left",
      children: [
        {
          text: "",
        },
      ],
    },
  ];
  /**
   * Memoized content derived from the chapter paragraphs.
   * This is used to initialize the text editor with the chapter's content.
   */
  const content = useMemo(() => {
    return !data || data.length === 0
      ? EMPTY_CONTENT
      : paragraphsToDescendants(data);
  }, [data]);

  const [paragraphs, setParagraphs] = useState(content);

  const { register, handleSubmit, reset } = useForm<EditChapterProps>({
    defaultValues: {
      title: chapter.title,
      paragraphs: chapter.paragraphs,
    },
  });

  const onChange = useCallback((values: Descendant[]) => {
    setParagraphs(values);
  }, []);

  const onSave: SubmitHandler<EditChapterProps> = async (data) => {
    const payload = {
      title: data.title,
      paragraphs: descendantsToParagraphs(paragraphs, chapter.id),
    };

    await onUpdateChapter(chapter.id, payload, {
      onUpdate: (chapter) => {
        reset({
          title: chapter.title,
          paragraphs:
            chapter.paragraphs && chapter.paragraphs.length > 0
              ? paragraphsToDescendants(chapter.paragraphs)
              : EMPTY_CONTENT,
        });
        showToast("Successfully saved the chapter", "success");
      },
      onError: (message) => {
        showToast(message, "error");
      },
    });
  };

  return (
    <>
      <div className="w-full h-fit my-2 px-4">
        <div className="w-full flex items-center justify-end gap-4">
          <form onSubmit={handleSubmit(onSave)}>
            <Button
              type={"submit"}
              variant={"primary"}
              className="rounded-full"
            >
              Save
            </Button>
          </form>
        </div>
      </div>
      <Input
        type="text"
        variant={"primary"}
        {...register("title")}
        inputSize={"lg"}
        placeholder="Chapter Title"
        className="w-full my-3 border-0 ring-0 text-xl"
      />
      {loading ? (
        <LoadingCircle />
      ) : (
        <TextEditor
          placeholder={"Write your chapter here..."}
          onSlateChange={onChange}
          values={content}
        />
      )}
    </>
  );
}
