import { Book, PaginationData } from '../types';

interface GetBooksResponse {
    books: Book[],
    pagination: PaginationData
}

export default async function getLatestBooks(page: number, perPage: number): Promise<GetBooksResponse> {
    return fetch(`/api/api/books/latest?page=${page}&limit=${perPage}`).then(response => response.json());
}
