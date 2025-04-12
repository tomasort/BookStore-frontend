import BookCard from '@/components/BookCard';
import { useQuery } from '@tanstack/react-query';
import { Book, PaginationData } from '../types';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./Carousel"


interface RelatedProductsResponse {
    books: Book[];
    pagination: PaginationData;
}

async function getRelatedProducts(bookId: string): Promise<RelatedProductsResponse> {
    // Fetch related products from the API
    const response = await fetch(`/api/api/books/related/${bookId}`);
    const repsonse_obj: RelatedProductsResponse = await response.json();
    return repsonse_obj;
}


export default function RelatedProducts({ bookId }: { bookId: string }) {
    const { data, isFetching } = useQuery({
        queryKey: ['relatedProducts', bookId],
        queryFn: () => getRelatedProducts(bookId),
    });

    if (isFetching) {
        return <p>Loading...</p>;
    }

    return (
        <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
            <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                Customers also bought
            </h2>

            <div className="flex container justify-center">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full mg:w-11/12 lg:w-10/12"
                >
                    <CarouselContent>
                        {data?.books && data.books.map((book) => (
                            <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/5">
                                <BookCard
                                    key={book.id}
                                    id={book.id}
                                    cover_url={book.cover_url}
                                    title={book.title}
                                    authors={book.authors}
                                    current_price={book.current_price}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent >
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </section>
    )
}
