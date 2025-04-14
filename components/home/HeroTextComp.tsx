import Spline from '@splinetool/react-spline'
import Image from 'next/image'
import React from 'react'

const HeroTextComp = () => {
  return (
    <div className="flex items-center justify-center w-full py-16 min-h-[80vh] px-8 bg-white">
      <div className="grid grid-cols-4 gap-4 lg:gap-8 w-full">

        <div className="col-span-4 lg:col-span-1">
          <h2 className="text-2xl md:text-4xl font-regular text-center lg:text-start text-amber-500 sticky top-32">About Us</h2>
        </div>
        <div className="col-span-4 lg:col-span-2 flex flex-col lg:items-start items-center justify-start gap-4 md:gap-8">
          <h1 className="text-3xl md:text-6xl col-span-2 md:col-span-1 font-light text-zinc-800 md:text-start text-center">
            Dara Dream Realty
          </h1>
          <p className="text-xl md:text-2xl col-span-2 lg:col-span-1 font-light text-zinc-800 lg:text-start text-center">
            Your trusted partner in real estate, backed by Century 21&apos;s legacy of excellence. Karandeep Dara brings expertise and dedication to every transaction.
          </p>
        </div>
        <div className="col-span-4 lg:col-span-1 flex items-center justify-center gap-4 rounded-full ">
          <Image
            src={"/images/img (11).PNG"}
            alt="Dara Dream Realtor"
            width={300}
            height={300}
            className="rounded-full shadow-lg bg-center object-cover w-52 h-52 lg:w-72 lg:h-72 m-2" 
          />
        </div>
      </div>
    </div>

  )
}

export default HeroTextComp