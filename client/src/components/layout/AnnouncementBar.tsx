import { announcement } from "@/features/home/home-content";

export function AnnouncementBar() {
  return (
    <p className="bg-deep px-5 py-2 text-center text-[0.82rem] text-on-deep max-[680px]:text-xs">
      {announcement}
    </p>
  );
}
