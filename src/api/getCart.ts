import { CartItem, User } from "../types";

interface CartData {
    id?: number;
    user?: User;
    items: CartItem[];
}

export default async function getCart(): Promise<CartData> {
    // Fetch cart data from the API
    const response = await fetch('/api/cart');
    const cartData = await response.json();
    return cartData;
}
