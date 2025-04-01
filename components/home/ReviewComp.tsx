"use client";
import React from 'react'
import ReviewCard from './ReviewCard'

const ReviewComp = () => {
  return (
    <div className="flex items-center justify-center w-full py-16 min-h-[80vh]">
      <div className="grid grid-cols-4 gap-4 md:gap-8 w-full">

        <div className="col-span-4 lg:col-span-1">
          <h2 className="text-2xl md:text-4xl font-regular text-center lg:text-start text-yellow-500  sticky top-32">Reviews</h2>
        </div>
        <div className="col-span-4 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 place-items-center">
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
        </div>
        
      </div>
    </div>

  )
}

export default ReviewComp