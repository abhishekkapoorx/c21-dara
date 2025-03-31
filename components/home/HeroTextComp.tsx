import Spline from '@splinetool/react-spline'
import React from 'react'

const HeroTextComp = () => {
  return (
    <div className="flex items-center justify-center w-full py-16 min-h-[80vh]">
      <div className="grid grid-cols-4 gap-4 w-full">
        {/* <div className="col-span-3 lg:col-span-2 grid grid-cols-2 gap-4 ">
        <h1 className="text-7xl col-span-2 md:col-span-1 font-light text-start text-zinc-800 dark:text-white">
          Dara Dream Realty
        </h1>
        <p className="text-2xl col-span-2 md:col-span-1 font-light text-zinc-800 dark:text-white">
          Your trusted partner in real estate, backed by Century 21's legacy of excellence. Karandeep Dara brings expertise and dedication to every transaction.
        </p>
      </div>

      <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center gap-4">
        <Spline
            scene="https://prod.spline.design/gy5gzKrNKHiAeqrI/scene.splinecode"
          />
      </div> */}

        <div className="col-span-4 md:col-span-1">
          <h2 className="text-2xl md:text-4xl font-light text-center md:text-start">About Us</h2>
        </div>
        <div className="col-span-4 md:col-span-2 flex flex-col md:items-start items-center justify-center gap-4 md:gap-8">
          <h1 className="text-3xl md:text-6xl col-span-2 md:col-span-1 font-light text-zinc-800 dark:text-white text-center">
            Dara Dream Realty
          </h1>
          <p className="text-xl md:text-2xl col-span-2 md:col-span-1 font-light text-zinc-800 dark:text-white">
            Your trusted partner in real estate, backed by Century 21's legacy of excellence. Karandeep Dara brings expertise and dedication to every transaction.
          </p>
        </div>
        <div className="col-span-4 md:col-span-1 flex items-center justify-center gap-4">
          <Spline
            scene="https://prod.spline.design/gy5gzKrNKHiAeqrI/scene.splinecode"
          />
        </div>
      </div>
    </div>

  )
}

export default HeroTextComp