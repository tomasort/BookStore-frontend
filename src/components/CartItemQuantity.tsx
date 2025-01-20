import { useState } from "react";

export default function CartItemQuantity({ bookId, quantity }: { bookId: number, quantity: number }) {

    const [selectedQuantity, setSelectedQuantity] = useState(quantity);

    const handleQuantityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        setSelectedQuantity(newQuantity);

        // Update the cart with the new quantity
        try {
            const response = await fetch(`/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ book_id: bookId, quantity: newQuantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to update cart');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };


    return (
        <>
            <label htmlFor={`quantity-${bookId}`} className="sr-only">
                Quantity, {bookId}
            </label>

            <select
                id={`quantity-${bookId}`}
                name={`quantity-${bookId}`}
                className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                value={selectedQuantity}
                onChange={handleQuantityChange}
            >
                {[...Array(8).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
            </select>
        </>

    )
}
