import CartItem from "./CartItem"
import { useCart } from "@/context/CartContext"

export default function Cart() {
    const { cartItems, isLoading, clearCart, updateQuantity } = useCart();
    async function handleClearCart(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        clearCart();
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div>
                <h2 className="sr-only">Items in your shopping cart</h2>
                <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                    {cartItems.map((item, index) => (
                        <li key={index} className="flex py-6 sm:py-10">
                            <CartItem item={item} updateQuantity={updateQuantity} />
                        </li>
                    ))}
                </ul>
            </div>

            <button
                type="button"
                className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                onClick={(event) => handleClearCart(event)}
            >
                <span>Clear Cart</span>
            </button>
        </div>
    )
}
