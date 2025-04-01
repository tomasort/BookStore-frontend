import { getCsrfToken } from "@/utils";
import { CartItem } from "@/types";

interface AddToCartParams {
    bookId: number;
    quantity: number;
}

interface AddToCartResponse {
    message: string;
    cart: {
        items: CartItem[];
    };
}

export default async function addToCart({ bookId, quantity }: AddToCartParams): Promise<AddToCartResponse> {
    const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify({
            book_id: bookId,
            quantity: quantity
        }),
    });
    if (response.status === 401) {
        throw new Error('Unauthorized');
    }
    return response.json();
}

