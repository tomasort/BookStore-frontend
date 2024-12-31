import { FC } from 'react';
import { BookData } from '../types';
import { useLoaderData } from 'react-router-dom';

export async function bookLoader({ params }): Promise<BookData> {
    const bookId = params.bookId; // Extract the bookId from the route parameters
    try {
        // Fetch book data from the API
        const response = await fetch(`/api/books-api/books/${bookId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch book with ID ${bookId}. Status: ${response.status}`);
        }

        const bookData: BookData = await response.json();
        return bookData;
    } catch (error) {
        console.error('Error loading book:', error);
        throw error; // Let the router handle the error
    }
}

const Book: FC = () => {
    const book = useLoaderData() as BookData;


    if (!book) return <p>Loading book details...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex">
                <div>
                    <p>{book.id}</p>
                </div>
                {/* Book cover image */}
                <div className="w-1/3">
                    <img
                        src={`/images${book.cover_url}`}
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="w-2/3 pl-6 flex flex-col justify-between">
                    <div>
                        {/* Book title and author */}
                        <h2 className="text-3xl font-semibold text-gray-800">{book.title}</h2>
                        <p className="text-lg text-gray-600 mb-4">by {book.author}</p>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed">{book.description}</p>
                    </div>

                    {/* Price and purchase button */}
                    <div className="mt-6">
                        <p className="text-2xl font-bold text-gray-900">{book.price}</p>
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;

