import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const gpaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = gpaRef.current;
    if (!el) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: 9.39,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
      onUpdate: () => {
        el.textContent = obj.v.toFixed(2);
      },
    });
    return () => { tween.scrollTrigger?.kill(); };
  }, []);

  return (
    <section id="education" className="relative px-8 py-32 md:py-48">
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
        07 — Education
      </div>
      <h2 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
        Forged at <span className="italic text-foreground/70">SRM University AP.</span>
      </h2>

      <div className="mt-16 grid items-center gap-12 border border-border p-8 md:grid-cols-[auto_1fr] md:gap-20 md:p-12">
        {/* GPA display */}
        <div className="text-center">
          <div className="font-serif text-8xl text-primary md:text-9xl">
            <span ref={gpaRef}>0.00</span>
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            CGPA — Sem. 1
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-serif text-3xl md:text-4xl">
            B.Tech — Mechanical Engineering
          </h3>
          <p className="mt-4 text-base leading-relaxed text-foreground/70 md:text-lg">
            SRM University, Andhra Pradesh &nbsp;·&nbsp; 1st Year (2nd Semester ongoing)
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/70 md:text-lg">
            Achieved a CGPA of 9.39 in my very first semester — a strong foundation built on
            genuine curiosity and relentless effort. Originally from West Bengal, I'm building
            an engineering career that bridges the mechanical and digital: from CAD to circuits,
            from assemblies to algorithms.
          </p>
        </div>
      </div>
    </section>
  );
}
