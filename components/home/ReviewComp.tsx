"use client";
import React, { useState } from 'react'
import ReviewCard, { GoogleReview } from './ReviewCard'
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { set } from 'mongoose';
import Link from 'next/link';
import { IconBrandGoogleFilled, IconCheck, IconStarFilled } from '@tabler/icons-react';

const ReviewComp = () => {
  const featurableWidgetId = "688365eb-fc4b-4a5f-bea5-2fbf262f63dd";
  const [reviewsGoogle, setReviewsGoogle] = useState<GoogleReview[]>([])

  return (
    <div className="flex items-center justify-center w-full py-16 min-h-[80vh] px-8 max-w-screen-2xl">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-10 w-full">

        <div className="">
          <h2 className="text-2xl md:text-4xl font-regular text-center lg:text-start text-amber-500  sticky top-32 bg-">Reviews</h2>
        </div>
        <div className="flex flex-col w-full max-w-7xl gap-8 justify-center items-center px-6 md:px-20">
          {reviewsGoogle.length > 0 && <div className="flex items-center justify-center w-full py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-neutral-800 rounded-lg px-4 py-3 md:px-6">
              <div className="flex items-center gap-2">
                <IconBrandGoogleFilled size={24} className="text-amber-500" />
                <span className="text-sm md:text-base font-medium">Excellent on Google</span>
              </div>
              <div className="flex items-center gap-1">
                <IconStarFilled size={20} className="text-amber-500" />
                <span className="text-amber-500 text-sm md:text-base">{Math.round(reviewsGoogle.reduce((a, r) => a + r.starRating, 0) / reviewsGoogle.length)}</span>
                <span className="text-xs md:text-sm text-gray-300">out of 5 based on {reviewsGoogle.length || 65} reviews</span>
              </div>
              <Link
                href="https://maps.app.goo.gl/y4gP5ZzaHJM1y2Ym8"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 md:mt-0 text-xs md:text-sm px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors flex items-center gap-1"
              >
                <IconCheck size={20} className="text-amber-500" />
                Review us on Google
              </Link>
            </div>
          </div>}
          <Carousel className="w-full max-w-7xl">
            <CarouselContent className='flex items-start md:justify-center'>
              <ReactGoogleReviews layout="custom" featurableId={featurableWidgetId} renderer={(reviews) => {
                setReviewsGoogle(reviews)
                return <></>
              }} />
              {reviewsGoogle.map((review, idx) => (
                <CarouselItem className='basis-4/5 md:basis-1/2 lg:basis-1/3 h-full' key={idx}>
                  <ReviewCard key={review.reviewId} review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* <ReactGoogleReviews layout="badge" featurableId={featurableWidgetId} theme='dark' badgeContainerClassName='w-full bg-neutral-900 flex item-center justify-center' /> */}
          {/* <ReactGoogleReviews layout="carousel" featurableId={featurableWidgetId} theme='dark' /> */}
        </div>

        {/* <div className="col-span-4 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 place-items-center">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div> */}

      </div>

    </div>

  )
}

export default ReviewComp