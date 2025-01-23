import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import getUserId from '../getUserId';
import Logout from './Logout';

function NavigationBar() {


    return (
        <div className="bg-primary text-white shadow-md">
            <div className="p-4 container mx-auto flex justify-between items-center">
                {/* Logo / Brand */}
                <h1 className="text-2xl font-bold">
                    <Link to="/" className="hover:text-primary-light">Book Store!</Link>
                </h1>

                {/* Search Bar */}
                <SearchBar />

                {/* Navigation Links */}

                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-primary-light font-medium transition duration-300"
                            >
                                Home
                            </Link>
                        </li>
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
                                to="/latest"
                                className="hover:text-primary-light font-medium transition duration-300"
                            >
                                Latest
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="hover:text-primary-light font-medium transition duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            {getUserId() ? (
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
                            {getUserId() ? (
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
            </div>
        </div>

    );
};

export default NavigationBar;

