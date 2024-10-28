import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Book from './routes/book'
import Root, { loader as rootLoader } from "./routes/root"
import Popular from "./routes/popular"
import ErrorPage from "./error-page"
import HomePage from "./routes/home"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/book/:bookId",
                element: <Book />,
            },
            {
                path: "/popular",
                element: <Popular />,
            },

        ]
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
