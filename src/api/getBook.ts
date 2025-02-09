import { BookDetailsData } from '../types';

export default async function getBook(bookId: string | undefined): Promise<BookDetailsData> {
    // Fetch book data from the API
    const response = await fetch(`/api/api/books/${bookId}`);
    const bookData: BookDetailsData = await response.json();
    return bookData;
}
