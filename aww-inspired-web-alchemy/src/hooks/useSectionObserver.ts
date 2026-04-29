import { useEffect } from "react";
import { useScene, type SectionId } from "@/store/scene";

const ids: SectionId[] = ["hero", "about", "skills", "workshop", "work", "space", "education", "contact"];

export function useSectionObserver() {
  const setActive = useScene((s) => s.setActive);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        // pick entry with largest intersection ratio
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best && best.isIntersecting) {
          setActive(best.target.id as SectionId);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [setActive]);
}
