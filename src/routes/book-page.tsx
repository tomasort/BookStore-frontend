import { FC } from 'react';
import { BookDetailsData } from '../types';
import { useLoaderData } from 'react-router-dom';

export async function bookLoader({ params }): Promise<BookDetailsData> {
    const bookId = params.bookId; // Extract the bookId from the route parameters
    try {
        // Fetch book data from the API
        const response = await fetch(`/api/api/books/${bookId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch book with ID ${bookId}. Status: ${response.status}`);
        }

        const bookData: BookDetailsData = await response.json();
        return bookData;
    } catch (error) {
        console.error('Error loading book:', error);
        throw error; // Let the router handle the error
    }
}

const BookPage: FC = () => {
    const book = useLoaderData() as BookDetailsData;


    if (!book) return <p>Loading book details...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex">
                {/* Book cover image */}
                <div className="w-1/3">
                    <div className="relative aspect-[3/4] w-full">
                        {book.cover_url === null ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <span className="text-gray-400">Image not available</span>
                            </div>
                        ) : (
                            <img
                                src={`/images${book.cover_url}`}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                            />
                        )}
                    </div>
                </div>
                <div className="w-2/3 pl-6 flex flex-col justify-between">
                    <div>
                        {/* Book title and author */}
                        <h2 className="text-3xl font-semibold text-gray-800">{book.title}</h2>
                        <p className="text-lg text-gray-600 mb-4">by {
                            book.authors.map((author, index) => (
                                <span key={author.id}>
                                    {author.name}
                                    {index < book.authors.length - 1 ? ', ' : ''}
                                </span>
                            ))
                        }</p>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mb-4">{book.description}</p>

                        {/* Additional details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Details</h3>
                                <p><strong>ISBN-10:</strong> {book.isbn_10}</p>
                                <p><strong>ISBN-13:</strong> {book.isbn_13}</p>
                                <p><strong>Pages:</strong> {book.number_of_pages}</p>
                                <p><strong>Format:</strong> {book.physical_format}</p>
                                <p><strong>Dimensions:</strong> {book.physical_dimensions}</p>
                                <p><strong>Weight:</strong> {book.weight}</p>
                                <p><strong>Publish Date:</strong> {book.publish_date}</p>
                                <p><strong>Publish Places:</strong> {book.publish_places.join(', ')}</p>
                                <p><strong>Languages:</strong> {book.languages.join(', ')}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Genres</h3>
                                <p>{book.genres.map(genre => genre.name).join(', ')}</p>
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">Publishers</h3>
                                <p>{book.publishers.map(publisher => publisher.name).join(', ')}</p>
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">Series</h3>
                                <p>{book.series.join(', ')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Price and purchase button */}
                    <div className="mt-6">
                        <p className="text-2xl font-bold text-gray-900">{book.current_price}</p>
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
