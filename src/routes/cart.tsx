import OrderSummary from '../components/OrderSummary'
import { useNavigate } from 'react-router-dom';
import Cart from "@/components/Cart"

export default function CartRoute() {
    const navigate = useNavigate();

    const handleCheckout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/checkout');
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

                <div className="mt-12">
                    <Cart />

                    <OrderSummary />

                    <div className="mt-10">
                        <button
                            type="submit"
                            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            onClick={(event) => handleCheckout(event)}
                        >
                            Checkout
                        </button>
                    </div>


                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>
                            or
                            <a href="/" className="mx-2 font-medium text-indigo-600 hover:text-indigo-500">
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

