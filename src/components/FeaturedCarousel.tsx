import BookCard from '@/components/BookCard';
import { useQuery } from '@tanstack/react-query';
import { BookCardData } from '@types';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "./Card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./Carousel"


async function getFeaturedBooks(): Promise<BookCardData[]> {
    // Fetch related products from the API
    const response = await fetch(`/api/api/featured_books`);
    const repsonse_obj: BookCardData[] = await response.json();
    return repsonse_obj;
}

export default function FeaturedCarousel() {
    const { data, isFetching } = useQuery({
        queryKey: ['featuredBooks'],
        queryFn: getFeaturedBooks,
    })
    return (
        <section className="container mx-auto py-16">
            <div className="flex container justify-center">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full mg:w-11/12 lg:w-10/12"
                >
                    <CarouselContent>
                        {data && data.map((featuredBook) => (
                            <CarouselItem key={featuredBook.book.id} className="md:basis-1/2 lg:basis-1/4">
                                <BookCard
                                    key={featuredBook.book.id}
                                    id={featuredBook.book.id}
                                    cover_url={featuredBook.book.cover_url}
                                    title={featuredBook.book.title}
                                    authors={featuredBook.book.authors}
                                    current_price={featuredBook.book.current_price}
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
