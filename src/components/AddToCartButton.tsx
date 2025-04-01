import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ bookId }: { bookId: number }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = async (event: any) => {
        event.preventDefault();
        addToCart(bookId, quantity);
    };

    return (
        <>
            <div className="flex h-8">
                <button
                    onClick={(event) => { handleAddToCart(event) }}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                    <span>Buy</span>
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


