import { Book } from '../types';

export default async function getBook(bookId: string | undefined): Promise<Book> {
    // Fetch book data from the API
    const response = await fetch(`/api/api/books/${bookId}`);
    const bookData: Book = await response.json();
    return bookData;
}
