// src/components/ErrorPage.tsx

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

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
        </div>
    );
}

