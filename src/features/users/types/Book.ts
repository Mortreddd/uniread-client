import { BookStatus, Genre } from "@/features/books/types/Book";

export interface AuthorRecentWorkBookDetails {

    id: string;
    title: string;
    description: string;
    averageRating: number;
    readCount: number;
    coverPhoto: string;
    totalLikes: number;
    totalChapters: number; 
    status: BookStatus;
    completed: boolean;
    matured: boolean;
    genres: Genre[];
    createdAt: string;
    lastModifiedAt: string;

}