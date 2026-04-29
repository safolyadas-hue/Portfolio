const skills = [
  { icon: "⚙", name: "SOLIDWORKS", desc: "CAD — Assemblies & Parts", level: 65 },
  { icon: "◇", name: "OnShape", desc: "Modelling & Animation", level: 70 },
  { icon: "⌘", name: "C Language", desc: "Embedded / Systems", level: 50 },
  { icon: "◯", name: "HTML", desc: "Web Fundamentals", level: 55 },
  { icon: "◈", name: "IoT Systems", desc: "ESP32 / Arduino / Sensors", level: 58 },
  { icon: "◭", name: "Mechanical Design", desc: "Components & Constraints", level: 52 },
];

const machining = [
  "Welding", "Surface Grinding", "Threading", "Knurling",
  "Drilling & Tapping", "Milling", "Cylindrical Grinding",
  "Step & Taper Turning", "Casting",
];

const creative = [
  { name: "Video Editing", desc: "Casual video edits using Instagram tools and mobile apps — cuts, transitions, and mood." },
  { name: "Canva Design", desc: "Designing posters, presentations and visual content with Canva." },
  { name: "Nature Photography", desc: "Phone photography with a genuine eye for light, texture, and the natural world." },
];

export default function Skills() {
  return (
    <section id="skills" className="relative px-8 py-32 md:py-48">
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
        02 — Toolkit
      </div>
      <h2 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
        Skills <span className="italic text-foreground/70">&</span>
        <br />
        Technologies
      </h2>

      <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
        {skills.map((s) => (
          <div
            key={s.name}
            data-cursor="hover"
            className="group relative overflow-hidden bg-background p-10 transition-colors hover:bg-secondary"
          >
            <div className="font-serif text-5xl text-primary transition-transform duration-500 group-hover:scale-110">
              {s.icon}
            </div>
            <div className="mt-8 font-serif text-2xl">{s.name}</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {s.desc}
            </div>
            {/* Skill bar */}
            <div className="mt-4 h-px w-full bg-border">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/20 transition-all duration-[1.4s] ease-out"
                style={{ width: `${s.level}%` }}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        ))}
      </div>

      {/* Workshop & Machining Skills tags */}
      <div className="mt-20">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          Workshop & Machining Skills
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-[0.2em]">
          {machining.map((m) => (
            <span key={m} className="border border-border px-4 py-2 text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Creative Skills */}
      <div className="mt-16">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          Creative Skills
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-6 grid gap-px bg-border md:grid-cols-3">
          {creative.map((c) => (
            <div
              key={c.name}
              data-cursor="hover"
              className="group bg-background p-8 transition-colors hover:bg-secondary"
            >
              <div className="font-serif text-2xl text-foreground transition-transform duration-500 group-hover:translate-x-2">
                {c.name}
              </div>
              <div className="mt-3 text-sm leading-relaxed text-foreground/70">
                {c.desc}
              </div>
              <div className="mt-4 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
