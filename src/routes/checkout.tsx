import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";

function calculateShipping() {
    return 8.0;
}

function calculateTaxes(subtotal: number) {
    return +(subtotal * 0.1).toFixed(2); // Example: 10% tax
}

export default function Checkout() {
    const { cartItems, updateQuantity } = useCart();
    const [discounts, setDiscounts] = useState(null);
    const [total, setTotal] = useState(0);
    const [shipping, setShipping] = useState(calculateShipping());

    const subtotal = cartItems.reduce(
        (acc, item) =>
            item.book.current_price
                ? acc + item.book.current_price * item.quantity
                : acc,
        0
    );
    const taxes = calculateTaxes(subtotal);

    useEffect(() => {
        setTotal(subtotal + taxes + shipping);
    }, [subtotal, taxes, shipping]);


    return (
        <>
            <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
                <h1 className="sr-only">Checkout</h1>
                {cartItems.length > 0 ? (
                    <CheckoutOrderSummary
                        cartItems={cartItems}
                        total={total}
                        subtotal={subtotal}
                        taxes={taxes}
                        shipping={shipping}
                        discounts={discounts}
                        setDiscounts={setDiscounts}
                        updateQuantity={updateQuantity}
                    />
                ) : (<div className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0">
                    <p className="text-2xl text-gray-500">Your cart is empty</p>
                </div>
                )}


                <CheckoutForm total={total} setShipping={setShipping} />
            </main>
        </>
    );
}
