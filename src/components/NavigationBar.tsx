import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Logout from './Logout';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';

function NavigationBar() {
    const { isAuthenticated } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-primary text-white shadow-md">
            <div className="p-4 container mx-auto flex justify-between items-center">
                {/* Logo / Brand */}
                <h1 className="text-2xl font-bold flex-shrink-0 w-auto">
                    <Link to="/" className="hover:text-primary-light">Book Store!</Link>
                </h1>

                {/* Search Bar - Only visible on larger screens */}
                <div className="hidden md:flex flex-grow flex justify-center mx-4">
                    <SearchBar
                        onFocusChange={setIsSearchFocused}
                        className={`relative transition-all duration-300 ease-in-out ${isSearchFocused ? "w-3/5" : "w-2/4"}`}
                    />
                </div>

                {/* Navigation Links - Only visible on larger screens */}
                <nav className="hidden md:flex">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/search/popular"
                                className="hover:text-primary-light font-medium transition duration-300"
                            >
                                Popular
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/search/latest"
                                className="hover:text-primary-light font-medium transition duration-300"
                            >
                                Latest
                            </Link>
                        </li>
                        <li>
                            {isAuthenticated ? (
                                <Logout />
                            ) : (
                                <Link
                                    to="/login"
                                    className="hover:text-primary-light font-medium transition duration-300"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                        <li>
                            {isAuthenticated ? (
                                <Link
                                    to="/user-dashboard"
                                    className="hover:text-primary-light font-medium transition duration-300"
                                >
                                    Settings
                                </Link>
                            ) : (
                                <Link
                                    to="/register"
                                    className="hover:text-primary-light font-medium transition duration-300"
                                >
                                    Register
                                </Link>
                            )}
                        </li>
                        <li>
                            <Link
                                to="/cart"
                                className="hover:text-primary-light font-medium transition duration-300"
                            >
                                Cart
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Hamburger Menu Button - Only visible on mobile */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <XMarkIcon className="h-7 w-7" />
                    ) : (
                        <Bars3Icon className="h-7 w-7" />
                    )}
                </button>
            </div>

            {/* Mobile Menu - Slides down when hamburger is clicked */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary-dark p-4 animate-fadeIn">
                    <div className="mb-8">
                        <SearchBar />
                    </div>
                    <ul>
                        <li className="mb-4">
                            <Link
                                to="/search/popular"
                                className="block text-xl hover:text-primary-light font-medium transition duration-300 py-2"
                                onClick={toggleMenu}
                            >
                                Popular
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/search/latest"
                                className="block text-xl hover:text-primary-light font-medium transition duration-300 py-2"
                                onClick={toggleMenu}
                            >
                                Latest
                            </Link>
                        </li>
                        <li className="mb-4">
                            {isAuthenticated ? (
                                <Logout />
                            ) : (
                                <Link
                                    to="/login"
                                    className="block text-xl hover:text-primary-light font-medium transition duration-300 py-2"
                                    onClick={toggleMenu}
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                        <li className="mb-4">
                            {isAuthenticated ? (
                                <Link
                                    to="/user-dashboard"
                                    className="block text-xl hover:text-primary-light font-medium transition duration-300 py-2"
                                    onClick={toggleMenu}
                                >
                                    Settings
                                </Link>
                            ) : (
                                <Link
                                    to="/register"
                                    className="block text-xl hover:text-primary-light font-medium transition duration-300 py-2"
                                    onClick={toggleMenu}
                                >
                                    Register
                                </Link>
                            )}
                        </li>
                        <li className="mb-4">
                            <Link
                                to="/cart"
                                className="block text-xl hover:text-primary-light font-medium transition duration-300 py-2"
                                onClick={toggleMenu}
                            >
                                Cart
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NavigationBar;
