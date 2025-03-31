import { useMutation } from "@tanstack/react-query"
import DiscountCodeForm from "./DiscountCodeForm"
import { useCart } from "@/context/CartContext"
import updateCart from "../api/updateCart"
import CartItem from "./CartItem"
import { CartItem as Item } from "@/types"


interface CheckoutOrderSummaryProps {
    cartItems: Item[];
    total: number;
    subtotal: number;
    taxes: number;
    shipping: number;
    discounts: any;
    setDiscounts: any;
    updateQuantity: any;
}

export default function CheckoutOrderSummary({ cartItems, total, subtotal, taxes, shipping, discounts, setDiscounts, updateQuantity }: CheckoutOrderSummaryProps) {

    return (
        <>
            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex">
                <h2 id="summary-heading" className="sr-only">
                    Order summary
                </h2>

                <ul role="list" className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6">
                    {cartItems.map((item, index) => (
                        <li key={index} className="flex py-6 sm:py-10">
                            <CartItem item={item} updateQuantity={updateQuantity} />
                        </li>
                    ))}
                    { /* products.map((product) => (
                        <li key={product.id} className="flex space-x-6 py-6">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                            />
                            <div className="flex flex-col justify-between space-y-4">
                                <div className="space-y-1 text-sm font-medium">
                                    <h3 className="text-gray-900">{product.name}</h3>
                                    <p className="text-gray-900">{product.price}</p>
                                    <p className="text-gray-500">{product.color}</p>
                                    <p className="text-gray-500">{product.size}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Edit
                                    </button>
                                    <div className="flex border-l border-gray-300 pl-4">
                                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )) */}
                </ul>

                <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
                    <DiscountCodeForm />

                    <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                        <div className="flex justify-between">
                            <dt>Subtotal</dt>
                            <dd className="text-gray-900">{subtotal}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="flex">
                                Discount
                                <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                                    {discounts}
                                </span>
                            </dt>
                            <dd className="text-gray-900">-{discounts}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt>Taxes</dt>
                            <dd className="text-gray-900">{taxes}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt>Shipping</dt>
                            <dd className="text-gray-900">{shipping}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                            <dt>Total</dt>
                            <dd className="text-base">{total}</dd>
                        </div>
                    </dl>
                </div>
            </section>
        </>
    )
}
