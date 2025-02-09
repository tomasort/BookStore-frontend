import getCsrfToken from "@/getCsrfToken"

interface PostReviewParams {
    bookId: number
    rating: number
    review: string
}


export default async function postReview({ bookId, rating, review }: PostReviewParams) {
    if (sessionStorage.getItem('userStatus') != 'loggedIn') {
        throw new Error('Unauthorized')
    }
    const response = await fetch(`/api/api/reviews/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify({
            rating: rating,
            comment: review,
        }),
        credentials: 'include',
    })
    if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
    }
    return response.json();
}
