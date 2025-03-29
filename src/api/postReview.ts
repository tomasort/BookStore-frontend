import authFetch from "./authFetch";
import getCsrfToken from "@/getCsrfToken"

interface PostReviewParams {
    bookId: number
    rating: number
    review: string
}


export default async function postReview({ bookId, rating, review }: PostReviewParams) {
    const response = await authFetch(`/api/api/reviews/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify({
            rating: rating,
            comment: review,
        }),
    })
    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message)
    }
    return response.json();
}
