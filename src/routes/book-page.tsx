import { FC } from 'react';
import { BookDetailsData } from '../types';
import { useLoaderData } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import { StarIcon } from '@heroicons/react/20/solid'
import {
    Bars3Icon,
    HeartIcon,
    MagnifyingGlassIcon,
    MinusIcon,
    PlusIcon,
    ShoppingBagIcon,
    UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'


const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
        { rating: 5, count: 1019 },
        { rating: 4, count: 162 },
        { rating: 3, count: 97 },
        { rating: 2, count: 199 },
        { rating: 1, count: 147 },
    ],
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
            author: 'Emily Selman',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
            date: 'May 16, 2021',
            datetime: '2021-01-06',
        },
        // More reviews...
    ],
}
export async function bookLoader({ params }): Promise<BookDetailsData> {
    const bookId = params.bookId; // Extract the bookId from the route parameters
    try {
        // Fetch book data from the API
        const response = await fetch(`/api/api/books/${bookId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch book with ID ${bookId}. Status: ${response.status}`);
        }

        const bookData: BookDetailsData = await response.json();
        return bookData;
    } catch (error) {
        console.error('Error loading book:', error);
        throw error; // Let the router handle the error
    }
}

const relatedProducts = [
    {
        id: 1,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    },
    // More products...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const BookPage: FC = () => {
    const book = useLoaderData() as BookDetailsData;

    if (!book) return <p>Loading book details...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex">
                {/* Book cover image */}
                <div className="w-1/3">
                    <div className="relative  w-full">
                        {book.cover_url === null ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <span className="text-gray-400">Image not available</span>
                            </div>
                        ) : (
                            <img
                                src={`/images${book.cover_url}`}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                            />
                        )}
                    </div>
                </div>
                <div className="w-2/3 pl-6 flex flex-col justify-between">
                    <div>
                        {/* Book title and author */}
                        <h2 className="text-3xl font-semibold text-gray-800">{book.title}</h2>
                        <p className="text-lg text-gray-600 mb-4">by {
                            book.authors.map((author, index) => (
                                <span key={author.id}>
                                    {author.name}
                                    {index < book.authors.length - 1 ? ', ' : ''}
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
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    </div>
                                    <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                                </div>
                                <p className="sr-only">{book.rating} out of 5 stars</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mb-4">{book.description}</p>

                        {/* Additional details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Details</h3>
                                <p><strong>ISBN-10:</strong> {book.isbn_10}</p>
                                <p><strong>ISBN-13:</strong> {book.isbn_13}</p>
                                <p><strong>Pages:</strong> {book.number_of_pages}</p>
                                <p><strong>Format:</strong> {book.physical_format}</p>
                                <p><strong>Dimensions:</strong> {book.physical_dimensions}</p>
                                <p><strong>Weight:</strong> {book.weight}</p>
                                <p><strong>Publish Date:</strong> {book.publish_date}</p>
                                <p><strong>Publish Places:</strong> {book.publish_places.join(', ')}</p>
                                <p><strong>Languages:</strong> {book.languages.join(', ')}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Genres</h3>
                                <p>{book.genres.map(genre => genre.name).join(', ')}</p>
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">Publishers</h3>
                                <p>{book.publishers.map(publisher => publisher.name).join(', ')}</p>
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">Series</h3>
                                <p>{book.series.join(', ')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Price and purchase button */}
                    <div className="mt-6">
                        <p className="text-2xl font-bold text-gray-900">{book.current_price}</p>
                    </div>
                    <div className="mt-10 flex">
                        <AddToCartButton bookId={book.id} />
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

            {/* Related Books */}
            <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
                <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                    Customers also bought
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {relatedProducts.map((product) => (
                        <div key={product.id}>
                            <div className="relative">
                                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="relative mt-4">
                                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                    />
                                    <p className="relative text-lg font-semibold text-white">{product.price}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <a
                                    href={product.href}
                                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                                >
                                    Add to bag<span className="sr-only">, {product.name}</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews */}

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
                                                reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                            </div>
                            <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Review data</h3>

                            <dl className="space-y-3">
                                {reviews.counts.map((count) => (
                                    <div key={count.rating} className="flex items-center text-sm">
                                        <dt className="flex flex-1 items-center">
                                            <p className="w-3 font-medium text-gray-900">
                                                {count.rating}
                                                <span className="sr-only"> star reviews</span>
                                            </p>
                                            <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                                                <StarIcon
                                                    className={classNames(
                                                        count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />

                                                <div className="relative ml-3 flex-1">
                                                    <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                                    {count.count > 0 ? (
                                                        <div
                                                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                                            style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                        </dt>
                                        <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                                            {Math.round((count.count / reviews.totalCount) * 100)}%
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                If you’ve used this product, share your thoughts with other customers
                            </p>

                            <a
                                href="#"
                                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                            >
                                Write a review
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                        <h3 className="sr-only">Recent reviews</h3>

                        <div className="flow-root">
                            <div className="-my-12 divide-y divide-gray-200">
                                {reviews.featured.map((review) => (
                                    <div key={review.id} className="py-12">
                                        <div className="flex items-center">
                                            <img src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                                            <div className="ml-4">
                                                <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                                                <div className="mt-1 flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="sr-only">{review.rating} out of 5 stars</p>
                                            </div>
                                        </div>

                                        <div
                                            className="mt-4 space-y-6 text-base italic text-gray-600"
                                            dangerouslySetInnerHTML={{ __html: review.content }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookPage;
