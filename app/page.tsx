import CrossfadeSlideshow from "@/components/ContentCarousel";
import Image from "next/image";
import Link from "next/link";
import Spline from '@splinetool/react-spline';


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full py-8 px-8">

      <div className="grid grid-cols-3 gap-4 w-full h-[50vh]">
        <div className="col-span-2 flex  items-center justify-start gap-4">
          <h1 className="text-7xl font-light text-zinc-800 dark:text-white">
            Dara Dream Realty
          </h1>
          <p className="text-2xl font-light text-zinc-800 dark:text-white">
            Your trusted partner in real estate, backed by Century 21's legacy of excellence.
          </p>
        </div>

        <div className="col-span-1 flex flex-col items-center justify-center gap-4">
          <Spline
            scene="https://prod.spline.design/gy5gzKrNKHiAeqrI/scene.splinecode"
          />
        </div>
      </div>


      <CrossfadeSlideshow />
    </section>
  );
}
