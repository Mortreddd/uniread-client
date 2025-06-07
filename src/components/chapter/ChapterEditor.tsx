import {Chapter} from "@/types/Chapter.ts";
import {useCallback, useEffect, useState} from "react";
import {Button} from "@/components/common/form/Button.tsx";
import {Input} from "@/components/common/form/Input.tsx";
import TextEditor from "@/components/toolbar/TextEditor.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {descendantsToParagraphs, Paragraph, paragraphsToDescendants} from "@/types/Paragraph.ts";
import {Descendant} from "slate";
import api from "@/services/ApiService.ts";
import {AxiosResponse} from "axios";
import {useToast} from "@/contexts/ToastContext.tsx";

interface ChapterEditorProps {
    chapter: Chapter;
}

interface EditChapterProps {
    title: string;
    paragraphs: Paragraph[];
}


export default function ChapterEditor({ chapter } : ChapterEditorProps) {
    /**
     * Get the chapter data from the API using the bookId and chapterId.
     * The data is used to populate the form fields and the text editor.
     */
    const { showToast } = useToast();
    const defaultValue: Descendant[] = [
        {
            type: "paragraph",
            align: "left",
            children: [
                {
                    text: ""
                }
            ]
        }
    ]
    const initialValue: Descendant[] = chapter?.paragraphs && chapter?.paragraphs.length > 0
        ? paragraphsToDescendants(chapter.paragraphs) : defaultValue;

    const [content, setContent] = useState<Descendant[]>(initialValue);
    const { register, handleSubmit, reset } = useForm<EditChapterProps>({
        defaultValues: {
            title: chapter.title,
            paragraphs: chapter.paragraphs,
        },
    });

    useEffect(() => {
        if (chapter) {
            reset({
                title: chapter.title,
                paragraphs: chapter.paragraphs ?? defaultValue,
            });
        }
    }, [chapter, reset]);

    const onChange = useCallback((values: Descendant[]) => {
        setContent(values);
        console.log(values)
    }, []);

    const onSave: SubmitHandler<EditChapterProps> = async (data) => {
        const paragraphs = descendantsToParagraphs(content, chapter?.id);
        const payload = {
            title: data.title,
            paragraphs
        }


        await api.put(`/books/${chapter.book.id}/chapters/${chapter.id}/update`, payload)
            .then((response : AxiosResponse<Chapter>) => {
                console.log(response);
                reset({
                    title: response.data.title,
                    paragraphs: response.data?.paragraphs && response.data?.paragraphs.length > 0
                        ? paragraphsToDescendants(response.data.paragraphs) : defaultValue
                })
                showToast("Successfully saved the chapter", "success");
            })
    };

    const onPublish: SubmitHandler<EditChapterProps> = async (data) => {
        console.log(data);
        showToast("Publish not implemented yet", "info");
    };

    
    return(
        <>
            <div className="w-full h-fit my-2 px-4">
                <div className="w-full flex items-center justify-end gap-4">
                    <form onSubmit={handleSubmit(onSave)}>

                        <Button
                            type={"submit"}
                            variant={"primary"}
                            className="rounded-full "
                        >
                            Save
                        </Button>
                    </form>
                    <form onSubmit={handleSubmit(onPublish)}>
                        <Button variant={"warning"} className="rounded-full ">
                            Publish
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
            <TextEditor
                placeholder={"Write your chapter here..."}
                onSlateChange={onChange}
                values={content}
            />
        </>
    )
}