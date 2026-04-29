import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    gsap.from(chars, {
      yPercent: 110,
      opacity: 0,
      stagger: 0.04,
      duration: 1.1,
      ease: "expo.out",
      delay: 0.4,
    });
  }, []);

  const split = (text: string) =>
    text.split("").map((c, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <span data-char className="inline-block">
          {c === " " ? "\u00A0" : c}
        </span>
      </span>
    ));

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end px-8 pb-20 pt-32"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
        Portfolio · 2026
      </div>

      <h1
        ref={titleRef}
        className="mt-8 font-serif text-[18vw] leading-[0.85] tracking-tight md:text-[12vw]"
      >
        <div className="overflow-hidden">{split("Safolya")}</div>
        <div className="overflow-hidden italic text-foreground/70">{split("Das")}</div>
      </h1>

      <div className="mt-10 max-w-xl font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Mechanical Engineering Student · CAD Designer · Embedded Systems Builder
      </div>

      <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
        <span className="border border-primary/60 px-3 py-2 text-primary">Open to Internships</span>
        <span className="border border-border px-3 py-2 text-foreground/70">SRM University AP</span>
        <span className="border border-border px-3 py-2 text-foreground/70">BTech — Mech. Engg.</span>
        <span className="border border-border px-3 py-2 text-foreground/70">CGPA 9.39</span>
        <span className="border border-border px-3 py-2 text-foreground/70">1st Year</span>
      </div>

      <div className="mt-16 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <span className="h-px w-10 bg-primary" />
        Scroll to explore
      </div>
    </section>
  );
}
