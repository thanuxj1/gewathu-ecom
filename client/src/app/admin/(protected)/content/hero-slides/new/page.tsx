import { HeroSlideForm } from "@/components/admin/HeroSlideForm";

export default function NewHeroSlidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">New hero slide</h1>
      <div className="mt-6">
        <HeroSlideForm />
      </div>
    </div>
  );
}
