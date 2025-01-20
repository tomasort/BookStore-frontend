import { getCsrfToken } from "../utils"
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import { CartItem as CartItemType } from '../types'
import { useEffect, useState } from 'react'

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItemType[]>([])

    async function updateQuantity(bookId: number, quantity: number) {
        const response = await fetch('/api/cart/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({ book_id: bookId, quantity: quantity }),
        });
        if (response.ok) {
            const json = await response.json();
            setCartItems(json['cart']['items']);
        }
    }
    useEffect(() => {
        // Fetch cart items from the API
        fetch('/api/cart')
            .then(response => response.json())
            .then(data => setCartItems(data['items']))
            .catch(error => console.error('Error fetching cart:', error));
    }, []);

    async function clearCart(event) {
        event.preventDefault();
        const response = await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
        });
        if (response.ok) {
            setCartItems([]);
        }
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

                <form className="mt-12">
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
                        onClick={(event) => clearCart(event)}
                    >
                        <span>Clear Cart</span>
                    </button>

                    {/* Order summary */}
                    <OrderSummary
                        subtotal={cartItems.reduce((acc, item) => acc + item.book.current_price * item.quantity, 0)}
                        tax={cartItems.reduce((acc, item) => acc + (item.book.current_price * 0.16) * item.quantity, 0)}
                        shipping={5}
                    />
                </form>
            </div>
        </div>
    )
}

