import { Outlet, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';

function Root() {
    return (
        <>
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
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
            <main className="container mx-auto p-6">
                <Outlet />
            </main>
        </>
    );
};

export default Root;

