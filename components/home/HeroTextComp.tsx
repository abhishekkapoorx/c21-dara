import Spline from '@splinetool/react-spline'
import Image from 'next/image'
import React from 'react'

const HeroTextComp = () => {
  return (
    <div className="flex items-center justify-center w-full py-16 min-h-[80vh] px-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full h-full max-w-7xl justify-center items-center">

        <div className="flex flex-col lg:items-start items-center justify-start gap-4 md:gap-8">
          <h2 className="text-2xl md:text-4xl font-regular text-center lg:text-start text-amber-500">About Us</h2>
          <h1 className="text-3xl md:text-6xl col-span-2 md:col-span-1 font-light text-zinc-800 md:text-start text-center">
            Dara Dream Realty
          </h1>
          <p className="text-xl md:text-2xl col-span-2 lg:col-span-1 font-light text-zinc-800 lg:text-start text-center">
            Your trusted partner in real estate, backed by Century 21&apos;s legacy of excellence. Karandeep Dara brings expertise and dedication to every transaction.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 rounded-2xl h-full w-full bg-center bg-cover">
          <Image
            src={"/images/agent11.PNG"}
            alt="Dara Dream Realtor"
            width={300}
            height={300}
            className="shadow-lg bg-center object-cover w-full rounded-2xl h-full max-h-[60vh] m-2 max-w-md bg-cover"
          />
        </div>
      </div>
    </div>

  )
}

export default HeroTextComp