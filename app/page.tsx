import CrossfadeSlideshow from "@/components/ContentCarousel";
import Image from "next/image";
import Link from "next/link";
import Spline from '@splinetool/react-spline';
import HeroTextComp from "@/components/home/HeroTextComp";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full py-8 px-8">

      <CrossfadeSlideshow />
      <HeroTextComp/>
    </section>
  );
}
