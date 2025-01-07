import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
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
                        to="/search/popular"
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
                <li>
                    <Link
                        to="/login"
                        className="hover:text-blue-200 font-medium transition duration-300"
                    >
                        Login
                    </Link>
                </li>
                <li>
                    <Link
                        to="/register"
                        className="hover:text-blue-200 font-medium transition duration-300"
                    >
                        Register
                    </Link>
                </li>
                <li>
                    <Link
                        to="/cart"
                        className="hover:text-blue-200 font-medium transition duration-300"
                    >
                        Cart
                    </Link>
                </li>
                <li>
                    <Link
                        to="/checkout"
                        className="hover:text-blue-200 font-medium transition duration-300"
                    >
                        Checkout
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;

