import ContentCarousel from "@/components/home/ContentCarousel";
import HeroTextComp from "@/components/home/HeroTextComp";
import ReviewComp from "@/components/home/ReviewComp";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full py-8 px-0 md:px-8">

      <ContentCarousel />
      <ReviewComp/>
      <HeroTextComp/>
      <ReviewComp/>
      <HeroTextComp/>
      
    </section>
  );
}
