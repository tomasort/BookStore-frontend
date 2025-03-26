import AddToCartButton from "./AddToCartButton";
import { StarIcon } from '@heroicons/react/20/solid';
import { HeartIcon, } from '@heroicons/react/24/outline'
import { Book } from "@/types";
import { getImageUrl } from "@/utils";
import { Link } from "react-router-dom";

interface BookDetailsProps {
    bookData: Book | undefined;
    averageRating: number;
    reviewsCount: number;
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const BookDetails = ({ bookData, averageRating, reviewsCount }: BookDetailsProps) => {

    return (
        <div className="flex">
            {/* Book cover image */}
            <div className="w-1/3">
                <div className="relative  w-full">
                    {bookData?.cover_url === null ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">Image not available</span>
                        </div>
                    ) : (
                        <img
                            src={getImageUrl(bookData?.cover_url)}
                            alt={`Cover of ${bookData?.title}`}
                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                        />
                    )}
                </div>
            </div>
            <div className="w-2/3 pl-6 flex flex-col justify-between">
                <div>
                    {/* Book title and author */}
                    <h2 className="text-3xl font-semibold text-gray-800">{bookData?.title}</h2>
                    <p className="text-lg text-gray-600 mb-4">by {
                        bookData?.authors.map((author, index) => (
                            <span key={author.id}>
                                <Link
                                    to={`/author/${author.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {author.name}
                                </Link>
                                {index < bookData?.authors.length - 1 ? ', ' : ''}
                            </span>
                        ))
                    }</p>

                    {/* Reviews */}
                    <div className="mt-2 mb-3">
                        <h3 className="sr-only">Reviews</h3>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div>
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <StarIcon
                                                key={index}
                                                className={classNames(
                                                    averageRating > index ? 'text-yellow-400' : 'text-gray-300',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{averageRating} out of 5 stars</p>
                                </div>
                                <p className="ml-2 text-sm text-gray-500">{reviewsCount} reviews</p>
                            </div>
                            <p className="sr-only">{bookData?.rating} out of 5 stars</p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-4">{bookData?.description}</p>

                    {/* Additional details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Details</h3>
                            <p><strong>ISBN-10:</strong> {bookData?.isbn_10}</p>
                            <p><strong>ISBN-13:</strong> {bookData?.isbn_13}</p>
                            <p><strong>Pages:</strong> {bookData?.number_of_pages}</p>
                            <p><strong>Format:</strong> {bookData?.physical_format}</p>
                            <p><strong>Dimensions:</strong> {bookData?.physical_dimensions}</p>
                            <p><strong>Weight:</strong> {bookData?.weight}</p>
                            <p><strong>Publish Date:</strong> {bookData?.publish_date}</p>
                            <p><strong>Publish Places:</strong> {bookData?.publish_places.join(', ')}</p>
                            <p><strong>Languages:</strong> {bookData?.languages.map(lang => lang.name).join(', ')}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Genres</h3>
                            <p>{bookData?.genres.map(genre => genre.name).join(', ')}</p>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">Publishers</h3>
                            <p>{bookData?.publishers.map(publisher => publisher.name).join(', ')}</p>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">Series</h3>
                            <p>{bookData?.series.map(s => s.name).join(', ')}</p>
                        </div>
                    </div>
                </div>

                {/* Price and purchase button */}
                <div className="mt-6">
                    <p className="text-2xl font-bold text-gray-900">{bookData?.current_price}</p>
                </div>
                <div className="mt-10 flex">
                    <AddToCartButton bookId={bookData?.id} />
                    <button
                        type="button"
                        className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                        <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                        <span className="sr-only">Add to favorites</span>
                    </button>
                </div>

            </div>


        </div>
    )
}

export default BookDetails;
