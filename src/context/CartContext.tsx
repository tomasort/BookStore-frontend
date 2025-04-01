import { useQuery, useMutation } from '@tanstack/react-query';
import { getCsrfToken } from "@/utils"
import updateCart from "../api/updateCart"
import getCart from '@/api/getCart';
import { useState, useEffect, useContext } from 'react';
import { createContext } from 'react';
import { CartItem } from '@/types';

type CartContextType = {
    cartItems: CartItem[];
    isLoading: boolean;
    updateQuantity: (bookId: number, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: any }) {
    const [cartItems, setCartItems] = useState([] as CartItem[])

    // Use React Query to fetch cart data
    const { data, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    });

    // Update state when initial data loads
    useEffect(() => {
        if (data?.items) {
            setCartItems(data.items);
        }
    }, [data]);

    // Update quantity mutation
    const updateQuantityMutation = useMutation({
        mutationFn: updateCart,
        onSuccess: (data) => {
            setCartItems(data?.cart.items);
        }
    })

    async function updateQuantity(bookId: number, quantity: number) {
        updateQuantityMutation.mutate({ book_id: bookId, quantity: quantity });
    }

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

    const clearCart = () => {
        clearCartMutation.mutate();
    };

    // The actual context value we're providing
    const cartContextValue: CartContextType = {
        cartItems: cartItems,
        isLoading: isLoading,
        updateQuantity: updateQuantity,
        clearCart: clearCart,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
