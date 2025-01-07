import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import BookPage, { bookLoader } from './routes/book-page'
import Root from "./routes/root"
import Popular from "./routes/popular"
import ErrorPage from "./error-page"
import HomePage from "./routes/home"
import Login from "./routes/login"
import Cart from "./routes/cart"
import Register from "./routes/register"
import Checkout from "./routes/checkout"

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
                element: <BookPage />,
                loader: bookLoader,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/cart",
                element: <Cart />,
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
