import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { BookData } from '../types';

function Popular() {
    const [books, setBooks] = useState<BookData[]>([]);

    async function getBooks() {
        console.log('Fetching books...');
        const response = await fetch('/api/api/books');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const response_data = await response.json();
        console.log(response_data);
        const books = response_data.books;
        setBooks(books);
        for (let book of books) {
            console.log(book.title);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    books.map((book) => (
                        <BookCard
                            key={book.id}
                            id={book.id}
                            cover_url={book.cover_url}
                            title={book.title}
                            authors={book.authors}
                            current_price={book.current_price}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Popular;

