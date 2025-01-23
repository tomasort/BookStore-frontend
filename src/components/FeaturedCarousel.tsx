import { Link } from 'react-router-dom';
import { Card, CardContent } from "./Card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./Carousel"

export default function FeaturedCarousel() {
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
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">

                                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <img
                                        src={`https://via.placeholder.com/150x220.png?text=Book+Cover+${index + 1}`}
                                        alt={`Book Cover ${index + 1}`}
                                        className="w-full h-60 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-900">Book Title {index + 1}</h3>
                                        <p className="text-gray-600 mb-2">Author Name</p>
                                        <p className="text-gray-700">Brief description of the book goes here. This is a placeholder description.</p>
                                        <Link to="/book/1">
                                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>

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
