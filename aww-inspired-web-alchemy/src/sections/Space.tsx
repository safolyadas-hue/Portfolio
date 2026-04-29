const readouts = [
  { label: "Field of Interest", value: "Orbital", suffix: "Mech." },
  { label: "Systems", value: "Propulsion", suffix: "& Launch" },
  { label: "Ambition", value: "Beyond", suffix: "Earth" },
  { label: "Status", value: "Exploring", suffix: "∞" },
];

export default function Space() {
  return (
    <section id="space" className="relative px-8 py-32 md:py-48">
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
        06 — Space
      </div>
      <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] md:text-7xl">
        The Universe
        <br />
        <span className="italic text-foreground/70">awaits.</span>
      </h2>
      <p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
        Beyond engineering on Earth lies the final frontier. I'm fascinated by space science
        and technology — from orbital mechanics to propulsion systems, from satellite design
        to the audacious challenge of long-duration human spaceflight. The same curiosity that
        drives my circuits drives my eyes skyward.
      </p>

      <div className="mt-16 flex flex-wrap gap-8 border-t border-foreground/15 pt-10">
        {readouts.map((r) => (
          <div key={r.label} className="flex flex-col gap-1.5">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/50">
              {r.label}
            </div>
            <div className="font-serif text-3xl text-foreground/90">
              {r.value}
              <span className="ml-1 text-lg text-foreground/60">{r.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 max-w-3xl border-l-2 border-primary pl-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Beyond the machine
        </div>
        <blockquote className="mt-3 font-serif text-2xl italic leading-snug md:text-3xl">
          "The best engineers are the ones who never stopped being curious."
        </blockquote>
      </div>
    </section>
  );
}
