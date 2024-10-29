import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Define a type for the book data (you can adjust this as needed)
interface Book {
    id: number;
    title: string;
    author: string;
    coverImage: string; // URL for book cover image
}

const Popular: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    // Placeholder data (will be replaced by API fetch in the future)
    useEffect(() => {
        const placeholderBooks: Book[] = [
            {
                id: 1,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                coverImage: 'https://via.placeholder.com/150x220.png?text=The+Great+Gatsby',
            },
            {
                id: 2,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                coverImage: 'https://via.placeholder.com/150x220.png?text=To+Kill+a+Mockingbird',
            },
            {
                id: 3,
                title: '1984',
                author: 'George Orwell',
                coverImage: 'https://via.placeholder.com/150x220.png?text=1984',
            },
        ];

        // Simulate fetching data
        setBooks(placeholderBooks);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Books</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={book.coverImage}
                            alt={`${book.title} cover`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
                            <p className="text-gray-600 mb-4">by {book.author}</p>
                            <Link to="/book/1" >
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Popular;

