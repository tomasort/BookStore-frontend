import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Root: FC = () => {
    return (
        <>
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo / Brand */}
                    <h1 className="text-2xl font-bold">
                        <Link to="/" className="hover:text-blue-200">Book Store!</Link>
                    </h1>

                    {/* Search Bar */}
                    <form className="flex items-center bg-white text-gray-800 rounded-lg overflow-hidden">
                        <input
                            type="search"
                            placeholder="Search for books"
                            className="px-4 py-2 outline-none w-full"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Search
                        </button>
                    </form>

                    {/* Navigation Links */}
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-blue-200 font-medium transition duration-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/popular"
                                    className="hover:text-blue-200 font-medium transition duration-300"
                                >
                                    Popular
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/latest"
                                    className="hover:text-blue-200 font-medium transition duration-300"
                                >
                                    Latest
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-blue-200 font-medium transition duration-300"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Content Section */}
            <main className="container mx-auto p-6">
                <Outlet />
            </main>
        </>
    );
};

export default Root;

