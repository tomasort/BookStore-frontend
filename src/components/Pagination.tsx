import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

interface PaginationProps {
    page: number;
    pages: number;
    hasPrev: boolean;
    hasNext: boolean;
    onPageChange: (page: number) => void;
}

export default function Pagination({ page, pages, hasPrev, hasNext, onPageChange }: PaginationProps) {
    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

    const getVisiblePages = () => {
        if (pages <= 5) {
            return pageNumbers;
        } else if (page < 3) {
            return [...pageNumbers.slice(0, 3), '...', ...pageNumbers.slice(-3)];
        } else if (page >= pages - 2) {
            return [...pageNumbers.slice(0, 1), '...', ...pageNumbers.slice(-3)];
        } else {
            return [page - 1, page, page + 1, '...', ...pageNumbers.slice(-3)];
        }
    };

    const visiblePages = getVisiblePages();

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-6">
            <div className="-mt-px flex w-0 flex-1">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPrev}
                    className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${hasPrev ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700' : 'text-gray-300 cursor-not-allowed'
                        }`}
                >
                    <ArrowLongLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                    Previous
                </button>
            </div>
            <div className="hidden md:-mt-px md:flex">
                {visiblePages.map((pageNumber, index) => (
                    <button
                        key={index}
                        onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
                        className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${pageNumber === page
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            }`}
                        disabled={typeof pageNumber !== 'number'}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNext}
                    className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ${hasNext ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700' : 'text-gray-300 cursor-not-allowed'
                        }`}
                >
                    Next
                    <ArrowLongRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </nav>
    );
}
