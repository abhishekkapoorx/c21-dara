import ContentCarousel from "@/components/home/ContentCarousel";
import HeroTextComp from "@/components/home/HeroTextComp";
import Listings from "@/components/home/Listings";
import ReviewComp from "@/components/home/ReviewComp";




export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center w-full py-8 px-0">

      <ContentCarousel />
      <HeroTextComp />
      <ReviewComp />
      {/* <Listings/> */}

    </section>
  );
}
