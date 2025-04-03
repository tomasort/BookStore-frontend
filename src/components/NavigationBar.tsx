import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Logout from './Logout';
import { useUser } from '@/context/UserContext';

function NavigationBar() {
    const { userId } = useUser();
    return (
        <div className="bg-primary text-white shadow-md">
            <div className="p-4 container mx-auto flex justify-between items-center">
                {/* Logo / Brand */}
                <h1 className="text-2xl font-bold flex-shrink-0 w-auto">
                    <Link to="/" className="hover:text-primary-light">Book Store!</Link>
                </h1>

                {/* Search Bar */}
                <SearchBar />

                {/* Navigation Links */}

                <nav>
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
                            {userId ? (
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
                            {userId ? (
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

