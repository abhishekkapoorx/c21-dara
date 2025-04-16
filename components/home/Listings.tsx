import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ListingCard from './ListingCard'
const Listings = () => {
    return (
        <div className="flex items-center justify-center w-full py-16  px-8 max-w-screen-2xl">
            <div className="flex flex-col items-center justify-center gap-4 md:gap-10 w-full">

                <div className="">
                    <h2 className="text-2xl md:text-4xl font-regular text-center lg:text-start text-amber-500  sticky top-32 bg-">Listings</h2>
                </div>
                <div className="flex flex-col w-full max-w-7xl gap-8 justify-center items-center px-6 md:px-20">
                    <Carousel className="w-full max-w-7xl">
                        <CarouselContent className='flex items-start md:justify-center'>
                            <CarouselItem className='basis-4/5 md:basis-1/2 lg:basis-1/3 h-full'>
                                <ListingCard />
                            </CarouselItem>
                            <CarouselItem className='basis-4/5 md:basis-1/2 lg:basis-1/3 h-full'>
                                <ListingCard />
                            </CarouselItem>
                            <CarouselItem className='basis-4/5 md:basis-1/2 lg:basis-1/3 h-full'>
                                <ListingCard />
                            </CarouselItem>
                            <CarouselItem className='basis-4/5 md:basis-1/2 lg:basis-1/3 h-full'>
                                <ListingCard />
                            </CarouselItem>
                            <CarouselItem className='basis-4/5 md:basis-1/2 lg:basis-1/3 h-full'>
                                <ListingCard />
                            </CarouselItem>
                            <CarouselItem className='basis-4/5 md:basis-1/2 lg:basis-1/3 h-full'>
                                <ListingCard />
                            </CarouselItem>
                            <CarouselItem className='basis-4/5 md:basis-1/2 lg:basis-1/3 h-full'>
                                <ListingCard />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Listings