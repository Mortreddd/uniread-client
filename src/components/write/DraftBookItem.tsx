import {Book} from "@/types/Book.ts";
import {BookCover} from "@/components/book/BookCover.tsx";
import defaultBookCover from "@/assets/cover6.jpg";
import {Button} from "@/components/common/form/Button.tsx";
import {EllipsisHorizontalIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import Dropdown, {DropdownContentRef} from "@/components/common/dropdown/Dropdown.tsx";
import {useRef, useState} from "react";
import DeleteBookModal from "@/components/common/modal/book/DeleteBookModal.tsx";
import {ModalRef} from "@/components/common/modal/Modal.tsx";

interface DraftBookItem {
    book: Book
    onDelete: (book: Book) => Promise<void>
}

export default function DraftBookItem({ book, onDelete, ...rest } : DraftBookItem) {
    const dropdownContentRef = useRef<DropdownContentRef>(null);
    const modalRef = useRef<ModalRef>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    function onClick() {
        setIsOpen(!isOpen);
        if(isOpen) {
            dropdownContentRef.current?.close();
        } else {
            dropdownContentRef.current?.open();
        }
    }

    function handleClickDelete() {
        modalRef.current?.open();
        onClick()
    }

    const { title, totalChapterDraftsCount, totalChapterPublishedCount } = book;
    return (
        <article className={'w-full h-fit flex items-center'} {...rest}>
            <DeleteBookModal ref={modalRef} book={book} onDelete={onDelete} onCancel={() => modalRef.current?.close()} />
            <BookCover src={defaultBookCover} size={'sm'}/>
            <div className={"flex-1 ml-3"}>
                <h1 className={"block text-gray-800 font-bold font-sans text-xl"}>
                    {title}
                </h1>
                <p className={"block text-green-500 font-sans font-semibold text-lg"}>
                    {totalChapterPublishedCount} Published Part
                </p>
                <p className={"block text-amber-500 font-sans font-semibold text-lg"}>
                    {totalChapterDraftsCount} Drafts
                </p>
                <strong>
                    <p className={"block text-gray-500 font-thin text-md font-sans"}>
                        Updated 3 hours ago
                    </p>
                </strong>
            </div>
            <div className={"w-fit h-full flex items-center gap-2"}>
                <Button variant={'transparent'} size={'custom'} className={'rounded-full flex items-center justify-center p-4'}>
                    <PencilSquareIcon className={'size-7'} />
                </Button>
                <div className={"relative"}>

                <Button onClick={onClick} variant={'transparent'} size={'custom'} className={'rounded-full flex items-center justify-center px-3 py-2'}>
                    <EllipsisHorizontalIcon className={'size-8'}/>
                </Button>
                <Dropdown.Content ref={dropdownContentRef} className={"top-0 right-0 absolute"}>
                    <Dropdown.Item variant={'danger'} onClick={() => handleClickDelete()}>
                        Delete Story
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Publish Book
                    </Dropdown.Item>
                </Dropdown.Content>
                </div>
            </div>

        </article>
    )
}