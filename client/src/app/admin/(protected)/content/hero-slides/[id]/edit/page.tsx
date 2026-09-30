import { notFound } from "next/navigation";
import { serverGet } from "@/lib/server-api";
import type { HeroSlide } from "@/lib/types";
import { HeroSlideForm } from "@/components/admin/HeroSlideForm";

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slides = (await serverGet<HeroSlide[]>("/api/admin/hero-slides")) ?? [];
  const slide = slides.find((s) => s.id === id);

  if (!slide) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit hero slide</h1>
      <div className="mt-6">
        <HeroSlideForm slide={slide} />
      </div>
    </div>
  );
}
