import { useEffect } from "react";
import Lenis from "lenis";
import { useScene } from "@/store/scene";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

export function useLenis() {
  const setProgress = useScene((s) => s.setProgress);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      setProgress(limit > 0 ? scroll / limit : 0);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [setProgress]);
}
