import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import { Book, PaginationData } from '../types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';



interface GetBooksResponse {
    books: Book[];
    pagination: PaginationData;
}


function SearchResults() {
    async function getSearchResults(query: string, page: number, perPage: number): Promise<GetBooksResponse> {
        return fetch(`/api/api/books/search?q=${query}&page=${page}&limit=${perPage}`).then(response => response.json());
    }

    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { data, isFetching } = useQuery({
        queryKey: ['search', page, perPage, query],
        queryFn: () => getSearchResults(query, page, perPage),
        placeholderData: keepPreviousData
    })

    function handlePageChange(newPage: number) {
        if (newPage > 0 && newPage <= (data?.pagination.pages || 1)) {
            setPage(newPage);
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Search Results: {query}</h2>
            <select
                id="perPage"
                name="perPage"
                className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                value={perPage}
                onChange={(event) => setPerPage(parseInt(event.target.value, 10))}
            >
                {[10, 20, 30].map((num) => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Grid of books */}
                    {data && data.books?.length === 0 ? (
                        <p>No books found</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {data && data.books.map((book) => (
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
                        page={page}
                        pages={data?.pagination?.pages || 1}
                        hasPrev={data?.pagination?.has_prev || false}
                        hasNext={data?.pagination?.has_next || false}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default SearchResults;

