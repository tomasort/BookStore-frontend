import { useState, useContext } from 'react';
import { createContext, Dispatch, SetStateAction } from 'react';
import { CartItem } from '@/types';

type CartContextType = [CartItem[], Dispatch<SetStateAction<CartItem[]>>];

export const CartContext = createContext<CartContextType>([[], () => { }]);

export function CartProvider({ children }: { children: any }) {
    const [cartItems, setCartItems] = useState([] as CartItem[])
    return (
        <CartContext.Provider value={[cartItems, setCartItems]}>
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
