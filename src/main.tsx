import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import BookPage from './routes/book-page'
import AuthorPage from './routes/author-page'
import Root from "./routes/root"
import Popular from "./routes/popular"
import Latest from "./routes/latest"
import ErrorPage from "./error-page"
import HomePage from "./routes/home"
import Login from "./routes/login"
import Cart from "./routes/cart"
import Register from "./routes/register"
import Checkout from "./routes/checkout"
import SearchResults from './routes/search-results'
import UserSidebar from './components/UserSidebar'
import UserDashboard from './routes/user-dashboard'
import { NotificationProvider } from './context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserProvider } from './context/UserContext'
import { CartProvider } from './context/CartContext'



const queryClient = new QueryClient()

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
            },
            {
                path: "/author/:authorId",
                element: <AuthorPage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/sidebar",
                element: <UserSidebar />,
            },
            {
                path: "/user-dashboard/",
                element: <UserDashboard />,
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
                    {
                        path: "/search/results",
                        element: <SearchResults />,
                    },
                    {
                        path: "/search/latest",
                        element: <Latest />,
                    }
                ]
            },
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <NotificationProvider>
                <UserProvider>
                    <CartProvider>

                        <RouterProvider router={router} />
                    </CartProvider>
                </UserProvider>
                <ReactQueryDevtools />
            </NotificationProvider>
        </QueryClientProvider >
    </StrictMode>,
)
