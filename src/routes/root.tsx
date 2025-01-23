import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function Root() {
    return (
        <>
            <header>
                <p className="flex h-8 w-screen items-center justify-center bg-indigo-600 text-sm font-medium text-white ">
                    Get free delivery on orders over $100
                </p>
                <NavigationBar />
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

