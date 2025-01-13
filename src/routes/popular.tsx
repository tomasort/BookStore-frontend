import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { BookData } from '../types';

function Popular() {
    const [books, setBooks] = useState<BookData[]>([]);
    const [pagination, setPagination] = useState({
        has_next: false,
        has_prev: false,
        page: 1,
        pages: 1,
        per_page: 10,
        total: 0
    });
    const [loading, setLoading] = useState(false);

    async function getBooks(page: number) {
        setLoading(true);
        try {
            const response = await fetch(`/api/api/books?page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const response_data = await response.json();
            setBooks(response_data.books);
            setPagination(response_data.pagination);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBooks(pagination.page);
    }, []);

    function handlePageChange(newPage: number) {
        if (newPage > 0 && newPage <= pagination.pages) {
            getBooks(newPage);
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Books</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                id={book.id}
                                cover_url={book.cover_url}
                                title={book.title}
                                authors={book.authors}
                                current_price={book.current_price}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={!pagination.has_prev}
                            className={`px-4 py-2 text-white ${pagination.has_prev ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">
                            Page {pagination.page} of {pagination.pages}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={!pagination.has_next}
                            className={`px-4 py-2 text-white ${pagination.has_next ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Popular;

