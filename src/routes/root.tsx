import { Outlet, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function Root() {
    return (
        <>
            <header className="bg-blue-600 text-white shadow-md">
                <p className="flex h-8 w-screen items-center justify-center bg-indigo-600 text-sm font-medium text-white ">
                    Get free delivery on orders over $100
                </p>
                <div className="p-4 container mx-auto flex justify-between items-center">
                    {/* Logo / Brand */}
                    <h1 className="text-2xl font-bold">
                        <Link to="/" className="hover:text-blue-200">Book Store!</Link>
                    </h1>

                    {/* Search Bar */}
                    <SearchBar />

                    {/* Navigation Links */}
                    <NavigationBar />
                </div>
            </header>

            {/* Content Section */}
            <main className="container mx-auto p-6 my-auto">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Root;

