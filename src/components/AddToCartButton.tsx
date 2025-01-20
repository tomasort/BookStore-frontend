import getCsrfToken from '../getCsrfToken';
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { useNotification } from '../context/NotificationContext';



export default function AddToCartButton({ bookId }: { bookId: number }) {
    const [quantity, setQuantity] = useState(1);
    const [oldQuantity, setOldQuantity] = useState(0);
    const { showNotification } = useNotification();

    useEffect(() => {
        // Fetch the current quantity from the cart when the component mounts
        const fetchCurrentQuantity = async () => {
            try {
                const response = await fetch('/api/cart');
                const json = await response.json();
                const cartItems: CartItem[] = json['items'];
                const currentItem: CartItem | undefined = cartItems.find(item => item.book.id === bookId);
                if (currentItem) {
                    setQuantity(currentItem.quantity);
                    setOldQuantity(currentItem.quantity);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchCurrentQuantity();
    }, [oldQuantity]);

    const handleAddToCart = async (event) => {
        event.preventDefault();

        try {
            let newQuantity = quantity - oldQuantity;
            if (newQuantity <= 0) {
                newQuantity = 1;
            }
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({ book_id: bookId, quantity: newQuantity }),
            });
            const json = await response.json();
            const cartItems: CartItem[] = json['cart']['items'];
            const currentItem: CartItem | undefined = cartItems.find(item => item.book.id === bookId);
            if (currentItem) {
                setQuantity(currentItem.quantity);
                setOldQuantity(currentItem.quantity);
            }
            if (!response.ok) {
                throw new Error('Failed to add book to cart');
            }
            // TODO: show how many items were added to the cart
            showNotification('Item added to your cart!');
        } catch (error) {
            console.error('Error adding book to cart:', error);
            showNotification('Failed to add book to cart');
        }
    };

    return (
        <>
            <div className="flex h-8">
                <button
                    onClick={(event) => { handleAddToCart(event) }}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                    {oldQuantity > 0 ? (
                        <span className="flex items-center">
                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" aria-hidden="true" />
                            Buy
                        </span>
                    ) : (
                        <span>Buy</span>
                    )}
                </button>

                <div className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <label htmlFor={`quantity-${bookId}`} className="sr-only">
                        Quantity
                    </label>

                    <select
                        id={`quantity-${bookId}`}
                        name={`quantity-${bookId}`}
                        className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={quantity}
                        onChange={(event) => setQuantity(parseInt(event.target.value, 10))}
                    >
                        {
                            Array.from({ length: 10 }, (_, i) => i + (quantity > 4 ? quantity - 4 : 1)).map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    );
}


