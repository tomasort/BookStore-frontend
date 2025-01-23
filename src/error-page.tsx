// src/components/ErrorPage.tsx

import { useEffect } from "react";
import { useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    useEffect(() => {
        if (error?.message === 'User is not logged in') {
            console.log("Redirecting to login page");
            // Save the user ID in the session storage
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userStatus');

            window.location.href = "/login";
        }
    }, [error]);

    const handleGoHome = () => {
        window.location.href = "/";
    };

    return (
        <div
            id="error-page"
            className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700 p-6"
        >
            <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-lg mb-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500 italic">
                <i>{error.statusText || error.message}</i>
            </p>
            <button
                onClick={handleGoHome}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Go to Home Page
            </button>
        </div>
    );
}

