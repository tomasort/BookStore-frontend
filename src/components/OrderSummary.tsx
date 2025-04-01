import { useContext } from 'react'
import { CartContext } from "@/context/CartContext"
import { useCart } from "@/context/CartContext"

export default function OrderSummary() {
    const { cartItems, isLoading, clearCart, updateQuantity } = useCart();

    let subtotal = cartItems.reduce((acc, item) => acc + item.book.current_price * item.quantity, 0);
    let tax = cartItems.reduce((acc, item) => acc + (item.book.current_price * 0.16) * item.quantity, 0);
    let shipping = 10;

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
            </div>
        </>

    )
}
