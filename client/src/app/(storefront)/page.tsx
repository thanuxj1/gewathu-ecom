import { CategoryGrid } from "@/features/home/CategoryGrid";
import { FeaturedProducts } from "@/features/home/FeaturedProducts";
import { GuidePreview } from "@/features/home/GuidePreview";
import { Hero } from "@/features/home/Hero";
import { Newsletter } from "@/features/home/Newsletter";
import { SeasonalBand } from "@/features/home/SeasonalBand";
import { StarterKit } from "@/features/home/StarterKit";
import { Testimonials } from "@/features/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <SeasonalBand />
      <StarterKit />
      <GuidePreview />
      <Testimonials />
      <Newsletter />
    </>
  );
}
