import { useNavigate } from 'react-router-dom';
export default function OrderSummary({ subtotal, tax, shipping }: { subtotal: number, tax: number, shipping: number }) {
    const navigate = useNavigate();

    const handleCheckout = (event) => {
        event.preventDefault();
        navigate('/checkout');
    };
    return (
        <>
            <div className="mt-10 sm:ml-32 sm:pl-6">
                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                    <h2 className="sr-only">Order summary</h2>

                    <div className="flow-root">
                        <dl className="-my-4 divide-y divide-gray-200 text-sm">
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-gray-600">Subtotal</dt>
                                <dd className="font-medium text-gray-900">${subtotal}</dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-gray-600">Shipping</dt>
                                <dd className="font-medium text-gray-900">${shipping}</dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-gray-600">Tax</dt>
                                <dd className="font-medium text-gray-900">${tax}</dd>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">${subtotal + tax + shipping}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
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
        </>

    )
}
