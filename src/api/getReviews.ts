import { ReviewsData } from '../types';

export default async function getReviews(bookId: string | undefined): Promise<ReviewsData> {
    const response = await fetch(`/api/api/reviews/${bookId}`);
    const reviewsData = await response.json();
    return reviewsData;
}
