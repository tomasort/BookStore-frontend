import { useParams } from "react-router";
import { useState } from 'react';
import { FC } from 'react';
import BookDetails from '@/components/BookDetails';
import RelatedProducts from '@/components/RelatedBooks';
import BookReviews from '@/components/BookReviews';
import { useUser } from "@/context/UserContext";
import EditAuthorDetails from "@/components/EditBookDetails";
import getAuthor from "@/api/getAuthor";
import { useQuery } from "@tanstack/react-query";
import { Author } from '@/types';

const AuthorPage: FC = () => {
    let params = useParams();
    const authorId: string | undefined = params.authorId;
    const { user } = useUser();
    const [editAuthor, setEditAuthor] = useState(true);
    const { isLoading, data } = useQuery({
        queryKey: ['author', authorId],
        queryFn: () => getAuthor(authorId),
        staleTime: 30000,
    })

    if (!authorId) return <p>Loading book details...</p>;
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">

            {
                isLoading ? <p>Loading...</p> : (data && <AuthorDetails authorData={data} />)
            }
            {
                user && user.role === 'admin' && (
                    <button
                        onClick={() => setEditAuthor(!editAuthor)}
                        className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg"
                    >
                        {editAuthor ? 'Cancel Edit' : 'Edit Author'}
                    </button>
                )
            }
        </div >
    );

    // return (
    //     <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
    //         {editBook && user?.role === 'admin' ?
    //             (data && <EditBookDetails bookData={data} />
    //             ) :
    //             (isLoading ? (
    //                 <p>Loading...</p>
    //             ) : (
    //                 <BookDetails
    //                     bookData={data}
    //                     averageRating={averageRating}
    //                     reviewsCount={reviewsCount}
    //                 />
    //             )
    //             )}
    //         {
    //             user && user.role === 'admin' && (
    //                 <button
    //                     onClick={() => setEditBook(!editBook)}
    //                     className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg"
    //                 >
    //                     {editBook ? 'Cancel Edit' : 'Edit Book'}
    //                 </button>
    //             )
    //         }
    //         <RelatedProducts />
    //         <BookReviews bookId={bookId} setAverageRating={setAverageRating} setReviewsCount={setReviewsCount} />
    //     </div >
    // );

    return <div>Author Page</div>
};

interface AuthorDetailsProps {
    authorData: Author;
}

const AuthorDetails = ({ authorData }: AuthorDetailsProps) => {
    return (
        <div>
            <h1>{authorData.name}</h1>
            <p>{authorData.biography}</p>
            <p>{authorData.photo_url}</p>
        </div>
    )
}

export default AuthorPage;
