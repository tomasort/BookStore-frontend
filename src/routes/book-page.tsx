import { useParams } from "react-router";
import { useState } from 'react';
import { FC } from 'react';
import BookDetails from '@/components/BookDetails';
import RelatedProducts from '@/components/RelatedBooks';
import BookReviews from '@/components/BookReviews';
import { useUser } from "@/context/UserContext";
import EditBookDetails from "@/components/EditBookDetails";
import getBook from "@/api/getBook";
import { useQuery } from "@tanstack/react-query";

const BookPage: FC = () => {
    let params = useParams();
    const bookId: string | undefined = params.bookId;
    const [editBook, setEditBook] = useState(true);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewsCount, setReviewsCount] = useState(0);
    const { user } = useUser();
    const { isLoading, data } = useQuery({
        queryKey: ['book', bookId],
        queryFn: () => getBook(bookId),
        staleTime: 30000,
    })

    if (!bookId) return <p>Loading book details...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
            {editBook && user?.role === 'admin' ?
                (data && <EditBookDetails bookData={data} />
                ) :
                (isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <BookDetails
                        bookData={data}
                        averageRating={averageRating}
                        reviewsCount={reviewsCount}
                    />
                )
                )}
            {
                user && user.role === 'admin' && (
                    <button
                        onClick={() => setEditBook(!editBook)}
                        className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg"
                    >
                        {editBook ? 'Cancel Edit' : 'Edit Book'}
                    </button>
                )
            }
            <RelatedProducts />
            <BookReviews bookId={bookId} setAverageRating={setAverageRating} setReviewsCount={setReviewsCount} />
        </div >
    );
};

export default BookPage;
