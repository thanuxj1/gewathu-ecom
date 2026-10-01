import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Gardening Guide",
  description: "Practical gardening advice for Sri Lankan homes, from Gewathu.lk.",
};

const guides = [
  {
    number: "01",
    title: "Start a vegetable garden",
    detail: "A simple guide for beginners",
    icon: "sprout" as const,
    tips: [
      "Pick a spot that gets at least 5–6 hours of sun a day — most vegetables need it to fruit well.",
      "Start small with easy, forgiving crops: mukunuwenna, bandakka (okra), green chilli, or tomato.",
      "Use a loose, well-draining mix — ordinary garden soil alone compacts and holds too much water. Blend in compost or coco peat.",
      "Sow seeds a little deeper than you think in the dry season, a little shallower in the monsoon, so they don't wash out or dry up.",
      "Check on your garden daily for the first two weeks — young seedlings are the most fragile stage.",
    ],
  },
  {
    number: "02",
    title: "Choose the right compost",
    detail: "Healthier soil, stronger plants",
    icon: "package" as const,
    tips: [
      "Vermicompost is the gentlest all-rounder — safe for seedlings and won't burn roots.",
      "Coco peat improves drainage and water retention in pots, but has almost no nutrients on its own — mix it with compost, don't use it alone.",
      "Cow dung manure is strong and affordable, but should be well-rotted (aged at least a few months) before use, or it can harm young plants.",
      "For pots, a good starting ratio is roughly 2 parts garden soil, 1 part compost, 1 part coco peat or sand for drainage.",
      "Top up pots with a thin layer of fresh compost every 4–6 weeks during the growing season instead of one big dose.",
    ],
  },
  {
    number: "03",
    title: "Water plants the right way",
    detail: "Save water and avoid root problems",
    icon: "droplets" as const,
    tips: [
      "Water early morning or late evening — midday watering evaporates fast and can shock leaves in strong sun.",
      "Check moisture before watering: push a finger 2–3cm into the soil. If it's still damp, wait a day.",
      "Deep, less-frequent watering grows stronger roots than a little water every day.",
      "Make sure pots have drainage holes — waterlogged roots are one of the most common ways home gardeners lose plants.",
      "In the rainy season, move sensitive pots (like succulents) under cover so they don't sit in standing water.",
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="shell section-space">
      <p className="kicker">Gewathu Gardening Guide</p>
      <h1 className="section-title">Good advice helps every garden grow.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
        Learn what to plant, when to water and how to care for your garden in Sri Lankan
        conditions.
      </p>

      <div className="mt-12 flex flex-col gap-10">
        {guides.map((guide) => (
          <article
            key={guide.number}
            className="grid gap-6 rounded-xl border border-border bg-surface p-6 min-[681px]:grid-cols-[auto_1fr] min-[681px]:p-8"
          >
            <div className="flex items-center gap-3 min-[681px]:flex-col min-[681px]:items-start min-[681px]:gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                <Icon name={guide.icon} className="h-6 w-6" />
              </span>
              <span className="text-sm font-extrabold tracking-[0.12em] text-text-muted">
                {guide.number}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-deep">{guide.title}</h2>
              <p className="mt-1 text-text-muted">{guide.detail}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {guide.tips.map((tip, index) => (
                  <li key={index} className="flex gap-2.5 leading-relaxed text-deep">
                    <Icon name="chevron" className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
