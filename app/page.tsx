import ContentCarousel from "@/components/home/ContentCarousel";
import HeroTextComp from "@/components/home/HeroTextComp";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full py-8 px-8">

      <ContentCarousel />
      <HeroTextComp/>
    </section>
  );
}
