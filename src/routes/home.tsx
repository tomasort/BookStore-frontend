// src/pages/HomePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Book Haven</h1>
                    <p className="text-lg max-w-2xl mx-auto mb-6">
                        Discover your next great read at our online bookstore. From classics to the latest releases, we have something for everyone.
                    </p>
                    <Link to="search/popular">
                        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition duration-300">
                            Explore Popular Books
                        </button>
                    </Link>
                </div>
            </section>

            {/* Featured Books Section */}
            <section className="container mx-auto py-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder book cards */}
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={`https://via.placeholder.com/150x220.png?text=Book+Cover+${index + 1}`}
                                alt={`Book Cover ${index + 1}`}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-900">Book Title {index + 1}</h3>
                                <p className="text-gray-600 mb-2">Author Name</p>
                                <p className="text-gray-700">Brief description of the book goes here. This is a placeholder description.</p>
                                <Link to="/book/1">
                                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-200 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">About Book Haven</h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        At Book Haven, we believe that every book has the power to transport, inspire, and transform. We are passionate about connecting readers with books that will enrich their lives and broaden their horizons. Our carefully curated collection includes a wide range of genres, from timeless classics to contemporary bestsellers.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

