import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import Book, { bookLoader } from './routes/book'
import Root from "./routes/root"
import Popular from "./routes/popular"
import ErrorPage from "./error-page"
import HomePage from "./routes/home"

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
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
                loader: bookLoader,
            },
            {
                path: "/search",
                element: <div><Outlet /></div>,
                children: [
                    {
                        path: "/search/popular",
                        element: <Popular />,
                    },
                ]
            },

        ]
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
