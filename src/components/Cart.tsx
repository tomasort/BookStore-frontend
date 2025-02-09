import { useQuery, useMutation } from "@tanstack/react-query"
import { useEffect } from 'react'
import getCart from "../api/getCart"
import updateCart from "../api/updateCart"
import CartItem from "./CartItem"
import { getCsrfToken } from "@/utils"
import { useCart } from "@/context/CartContext"

export default function Cart() {
    const [cartItems, setCartItems] = useCart();
    const { data, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    })
    const updateQuantityMutation = useMutation({
        mutationFn: updateCart,
        onSuccess: (data) => {
            setCartItems(data?.cart.items);
        }
    })
    const clearCartMutation = useMutation({
        mutationFn: () => {
            return fetch('/api/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
            });
        },
        onSuccess: () => {
            setCartItems([]);
        }
    })
    async function updateQuantity(bookId: number, quantity: number) {
        updateQuantityMutation.mutate({ book_id: bookId, quantity: quantity });
    }
    async function handleClearCart(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        clearCartMutation.mutate();
    }
    useEffect(() => {
        if (data) {
            setCartItems(data.items)
        }
    }, [data])
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
