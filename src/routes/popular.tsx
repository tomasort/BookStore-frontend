import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import { BookCardData } from '../types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';


interface PaginationData {
    has_next: boolean,
    has_prev: boolean,
    page: number,
    pages: number,
    per_page: number,
    total: number
}

interface GetBooksResponse {
    books: BookCardData[],
    pagination: PaginationData
}


function Popular() {
    async function getBooks(pagination: PaginationData): Promise<GetBooksResponse> {
        return fetch(`/api/api/books?page=${pagination.page}&limit=${pagination.per_page}`).then(response => response.json());
    }
    const [books, setBooks] = useState<BookCardData[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        has_next: false,
        has_prev: false,
        page: 1,
        pages: 1,
        per_page: 10,
        total: 0
    });

    const query = useQuery({
        queryKey: ['books', pagination],
        queryFn: () => getBooks(pagination),
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (query.data?.books && query.data?.pagination) {
            setBooks(query.data.books);
            setPagination(query.data.pagination);
        }
    }, [query.data]);

    function handlePageChange(newPage: number) {
        if (newPage > 0 && newPage <= pagination.pages) {
            setPagination({ ...pagination, page: newPage });
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Books</h2>
            <select
                id="perPage"
                name="perPage"
                className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                value={pagination.per_page}
                onChange={(event) => setPagination({ ...pagination, per_page: parseInt(event.target.value, 10) })}
            >
                {[10, 20, 30].map((num) => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
            {query.isLoading || query.isPending ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Grid of books */}
                    {books.length === 0 ? (
                        <p>No books found</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
                    )}

                    {/* Pagination */}
                    <Pagination
                        page={pagination.page}
                        pages={pagination.pages}
                        hasPrev={pagination.has_prev}
                        hasNext={pagination.has_next}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default Popular;

