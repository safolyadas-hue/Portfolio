import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 9.39, label: "CGPA — Sem. 1", decimals: 2 },
  { value: 20, label: "Years Old" },
  { value: 7, label: "Projects Built", suffix: "+" },
  { value: 9, label: "Machining Skills" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const counters = el.querySelectorAll<HTMLElement>("[data-counter]");
    const triggers: ScrollTrigger[] = [];
    counters.forEach((c) => {
      const end = parseFloat(c.dataset.counter || "0");
      const dec = parseInt(c.dataset.decimals || "0", 10);
      const obj = { v: 0 };
      const tween = gsap.to(obj, {
        v: end,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: c, start: "top 85%" },
        onUpdate: () => {
          c.textContent = obj.v.toFixed(dec);
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-8 py-32 md:py-48"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
        01 — Who I Am
      </div>

      <h2 className="mt-6 max-w-5xl font-serif text-5xl leading-[1.05] md:text-7xl">
        Engineering<span className="text-primary">.</span>
        <br />
        precision<span className="text-primary">.</span>
        <span className="italic text-foreground/70"> Curiosity.</span>
      </h2>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div className="space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg">
          <p>
            I'm <strong className="text-foreground">Safolya Das</strong>, a first-year B.Tech
            Mechanical Engineering student at SRM University, Andhra Pradesh. Originally from{" "}
            <strong className="text-foreground">West Bengal</strong>, I'm 20 years old — driven by
            an obsessive need to understand how things work, then build them better.
          </p>
          <p>
            My craft spans multiple worlds: the precise geometry of{" "}
            <strong className="text-foreground">CAD modelling</strong>, the raw satisfaction of{" "}
            <strong className="text-foreground">workshop machining</strong>, and the low-level
            logic of <strong className="text-foreground">embedded systems and IoT</strong>. I write
            C and HTML, and I'm always building something new — even when it doesn't work the first
            time. <em>Especially</em> then.
          </p>
          <p>
            Engineering, to me, isn't just solving problems. It's about{" "}
            <strong className="text-primary">asking questions nobody else thought to ask.</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8">
              <div className="font-serif text-5xl text-primary md:text-6xl">
                <span data-counter={s.value} data-decimals={s.decimals ?? 0}>0</span>
                {s.suffix}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 max-w-3xl border-l-2 border-primary pl-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          The craft of precision
        </div>
        <blockquote className="mt-3 font-serif text-2xl italic leading-snug md:text-3xl">
          "Engineering is the art of making what you want from what you can get."
        </blockquote>
      </div>
    </section>
  );
}
