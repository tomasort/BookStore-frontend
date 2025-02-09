import { CartItem, User } from "../types";
import { getCsrfToken } from "../utils";

interface CartData {
    id?: number;
    user?: User;
    items: CartItem[];
}

interface UpdateCartResponse {
    message: string;
    cart: CartData;
}

interface UpdateCartParams {
    book_id: number;
    quantity: number;
}

export default async function updateCart({ book_id, quantity }: UpdateCartParams): Promise<UpdateCartResponse> {
    // Fetch cart data from the API
    const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify({ book_id, quantity }),
    });
    const cartData = await response.json();
    return cartData;
}
