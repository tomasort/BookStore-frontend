import { FC, useEffect, useState } from 'react';

interface BookProps {
    bookId: string; // ID to fetch book details from API later
}

interface BookData {
    title: string;
    author: string;
    description: string;
    price: string;
    coverImage: string;
}

const Book: FC<BookProps> = ({ bookId }) => {
    const [book, setBook] = useState<BookData | null>(null);

    useEffect(() => {
        // Placeholder data; replace with API fetch when ready
        const placeholderBook: BookData = {
            title: 'Sample Book Title',
            author: 'Sample Author',
            description: 'This is a placeholder description of the book.',
            price: '$19.99',
            coverImage: 'https://robohash.org/you.png?size=200x200',
        };

        // Simulate fetching data (replace this with actual API call)
        setBook(placeholderBook);
    }, [bookId]);

    if (!book) return <p>Loading book details...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex">
                {/* Book cover image */}
                <div className="w-1/3">
                    <img
                        src={book.coverImage}
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

