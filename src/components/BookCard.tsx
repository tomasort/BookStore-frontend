import { BookCardData } from '../types';
import AddToCartButton from './AddToCartButton';

export default function BookCard({ id, cover_url, title, authors, current_price }: BookCardData) {

    const handleClick = () => {
        // Navigate to the book's URL
        window.location.href = `/book/${id}`;
    };

    return (
        <>
            <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden relative group">
                {/* Make the entire card clickable with an overlay button */}
                <button
                    type="button"
                    onClick={handleClick}
                    className="absolute inset-0 w-full h-full focus:outline-none z-10"
                >
                    <span className="sr-only">View details for {title}</span>
                </button>


                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full">
                    {cover_url === null ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">Image not available</span>
                        </div>
                    ) : (
                        <img
                            src={`/images${cover_url}`}
                            alt={`Cover of ${title}`}
                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                        />
                    )}
                </div>

                {/* Content Container */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        {authors.map((author, index) => (
                            <span key={index}>
                                {author.name}
                                {index < authors.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </p>
                    <p className="text-lg font-bold text-red-600 mt-auto">
                        ${current_price}
                    </p>
                </div>
                {/* add to cart button */}
                <div className="p-4 flex flex-col relative z-20">
                    <AddToCartButton bookId={id} />
                </div>
            </div>
        </>

    );
}
