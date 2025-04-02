import { getCsrfToken } from "@/utils"

export default async function clearCart() {
    return fetch('/api/cart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
    });
}
