import { useNotification } from '../context/NotificationContext';
import addToCart from '../api/addToCart';
import clearCart from '../api/clearCart';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
    addToCart: (bookId: number, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: any }) {
    const [cartItems, setCartItems] = useState([] as CartItem[])
    const { showNotification } = useNotification();
    const queryClient = useQueryClient()

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
        mutationFn: clearCart,
        onSuccess: () => {
            setCartItems([]);
        }
    })

    const addToCartMutation = useMutation({
        mutationFn: addToCart,
        onError: (err) => {
            if (err.message === 'Unauthorized') {
                window.location.href = '/login';
            } else {
                showNotification('Failed to add to cart');
            }
        },
        onSuccess: (_, variables) => {
            const { quantity } = variables;
            if (quantity > 1) {
                showNotification(`${quantity} Items added to your cart!`)
            } else {
                showNotification('Item added to your cart!')
            }
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    const addBookToCart = (bookId: number, quantity: number) => {
        addToCartMutation.mutate({ bookId: bookId, quantity: quantity });
    };

    // The actual context value we're providing
    const cartContextValue: CartContextType = {
        cartItems: cartItems,
        isLoading: isLoading,
        updateQuantity: updateQuantity,
        clearCart: () => { clearCartMutation.mutate() },
        addToCart: addBookToCart,
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
