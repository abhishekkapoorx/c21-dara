import Spline from '@splinetool/react-spline'
import React from 'react'

const HeroTextComp = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full h-[50vh]">
        <div className="col-span-3 lg:col-span-2 flex flex-col md:flex-row  items-start md:items-center justify-center gap-4">
          <h1 className="text-7xl font-light text-start text-zinc-800 dark:text-white">
            Dara Dream Realty
          </h1>
          <p className="text-2xl font-light text-zinc-800 dark:text-white">
            Your trusted partner in real estate, backed by Century 21's legacy of excellence.
          </p>
        </div>

        <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center gap-4">
          {/* <Spline
            scene="https://prod.spline.design/gy5gzKrNKHiAeqrI/scene.splinecode"
          /> */}
        </div>
      </div>
  )
}

export default HeroTextComp