import { StarIcon } from '@heroicons/react/20/solid';
import ReviewStats from '@/components/ReviewsStats';
import Review from '../components/Review';
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import postReview from '@/api/postReview';
import getReviews from '@/api/getReviews';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

interface BookReviewProps {
    bookId: string | undefined;
    setAverageRating: (rating: number) => void;
    setReviewsCount: (count: number) => void;
}

export default function BookReviews({ bookId, setAverageRating, setReviewsCount }: BookReviewProps) {

    const [showReviewInput, setShowReviewInput] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
    const queryClient = useQueryClient();

    const { data, isPending, isLoading } = useQuery({
        queryKey: ['reviews', bookId],
        queryFn: () => getReviews(bookId)
    })

    const postReviewMutation = useMutation({
        mutationFn: postReview,
        onSuccess: () => {
            console.log('Review submitted successfully');
            queryClient.invalidateQueries({ queryKey: ['reviews', bookId] });
            setShowReviewInput(false);
        },
        onError: (error) => {
            if (error.message === 'Unauthorized') {
                alert('Please login to submit a review');
            }
            alert(error.message);
        }
    })

    function handleMouseOverStar(value: number | undefined) {
        setHoverValue(value)
    };

    function handleMouseLeaveStar() {
        setHoverValue(undefined)
    };

    function handleClickStar(value: number) {
        setRating(value)
    };

    useEffect(() => {
        if (data) {
            setAverageRating(data.average_rating);
            setReviewsCount(data.total_count);
        }
    }, [data])

    async function handleReviewSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        postReviewMutation.mutate({ bookId: parseInt(bookId!), rating: rating, review: review });
    }

    if (isLoading || isPending) {
        return <div>Loading reviews...</div>
    }

    return (
        <section aria-labelledby="reviews-heading" className="bg-white">

            <div className="border-t mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
                <div className="lg:col-span-4">
                    <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Customer Reviews
                    </h2>

                    <div className="mt-3 flex items-center">
                        <div>
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            data && data?.average_rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="sr-only">{data?.average_rating} out of 5 stars</p>
                        </div>
                        <p className="ml-2 text-sm text-gray-900">Based on {data?.total_count} {data?.total_count != 1 ? "reviews" : "review"}</p>
                    </div>

                    <ReviewStats reviewsData={data} />

                    <div className="mt-10">
                        <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            If you’ve used this product, share your thoughts with other customers
                        </p>

                        <button
                            onClick={() => setShowReviewInput(!showReviewInput)} // Toggle review input visibility
                            className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                        >
                            Write a review
                        </button>
                    </div>
                </div>

                <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                    <h3 className="sr-only">Recent reviews</h3>

                    <div className="flow-root">
                        <div className="-my-12 divide-y divide-gray-200">
                            {data && data.reviews?.length === 0 ? (<p className="py-12">Be the first to review this product!</p>) : null}
                            {data && data.reviews.map((r) => (
                                <Review review={r} />
                            ))}
                        </div>
                    </div>
                </div>

                {showReviewInput && (

                    <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0 border-t border-gray-200">
                        <div className="flex items-center mt-8">
                            <div>
                                <div
                                    className="flex items-center"
                                    onMouseLeave={() => setHoverValue(rating)} // Add onMouseLeave here
                                >
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <StarIcon
                                            key={index}
                                            onChange={() => setRating(index)}
                                            className={classNames(
                                                (hoverValue || rating) > index ? 'text-yellow-400' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                            onClick={() => handleClickStar(index + 1)}
                                            onMouseOver={() => handleMouseOverStar(index + 1)}
                                            onMouseLeave={() => handleMouseLeaveStar}
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{rating} out of 5 stars</p>
                            </div>
                            <p className="ml-2 text-sm text-gray-500">{hoverValue} stars</p>
                        </div>
                        <div className="mt-8 ">
                            <textarea
                                className="w-full rounded-md border border-gray-300 p-2"
                                rows={4}
                                placeholder="Write your review here..."
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <button
                                className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto lg:w-full"
                                onClick={handleReviewSubmit}
                            >
                                Upload review
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}
