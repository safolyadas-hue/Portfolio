const cadProjects = [
  {
    n: "01",
    tool: "OnShape",
    t: "Bolt & Nut Thread Animation",
    d: "Animated a bolt threading into a nut, constrained to stop at the final thread.",
    status: "done" as const,
  },
  {
    n: "02",
    tool: "OnShape",
    t: "Lamborghini-Inspired Wheel Rim",
    d: "3–4 hours perfecting angled spokes inspired by Lamborghini's signature rims.",
    status: "done" as const,
  },
  {
    n: "03",
    tool: "SOLIDWORKS",
    t: "Hydraulic Press Assembly",
    d: "Multi-component SOLIDWORKS assembly — understanding how mechanical systems interact under load.",
    status: "done" as const,
  },
];

const iotProjects = [
  {
    n: "04",
    tool: "Embedded Systems",
    t: "Dancing LED Array",
    d: "Custom firmware controlling light speed, frequency and pattern sequences.",
    status: "done" as const,
  },
  {
    n: "05",
    tool: "IoT — Sensors",
    t: "IoT Water Flow Meter",
    d: "Real-time water flow measurement with IoT data output. Worked perfectly on first deploy.",
    status: "done" as const,
  },
  {
    n: "06",
    tool: "ESP32-C6 · MPU6050 · L298N",
    t: "Self-Balancing Robot",
    d: "PID-controlled two-wheeled robot. Fighting physics, one feedback loop at a time.",
    status: "wip" as const,
  },
  {
    n: "07",
    tool: "Control Systems",
    t: "Helicopter Blade Auto-Balancer",
    d: "Rotor-based auto-balancing experiment. Hardware solid — diving into control theory to fix the algorithm.",
    status: "wip" as const,
  },
];

const webProject = {
  tool: "Team Project · Web Platform",
  t: "CareConnect",
  d: "A full-stack medical intelligence platform built with Team Praggya. Simulates treatment outcomes via digital twins, trains young doctors using real physician case archives, and manages a live blood donor network.",
  features: [
    "Digital twin patient simulation engine",
    "Medication outcome modelling for trainee doctors",
    "Real-time blood donor & hospital registry",
    "Emergency SOS with location broadcast",
    "Secure role-based login (hospital / individual)",
  ],
  tags: ["HTML", "JavaScript", "Vercel", "Medical AI", "Blood Bank"],
  link: "https://careconnect-live.vercel.app/",
  team: "Team Praggya",
};

const allProjects = [...cadProjects, ...iotProjects];

export default function Work() {
  return (
    <section id="work" className="relative px-8 py-32 md:py-48">
      {/* ── CAD & IoT Projects ── */}
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
        04 — Selected Work
      </div>
      <h2 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
        Things I've <span className="italic text-foreground/70">built.</span>
      </h2>

      <div className="mt-16 divide-y divide-border border-y border-border">
        {allProjects.map((it) => (
          <a
            key={it.n}
            href="#"
            data-cursor="hover"
            onClick={(e) => e.preventDefault()}
            className="group grid grid-cols-12 items-baseline gap-4 px-2 py-10 transition-colors hover:bg-secondary/40"
          >
            <div className="col-span-2 font-mono text-xs text-muted-foreground md:col-span-1">
              {it.n}
            </div>
            <div className="col-span-10 md:col-span-4">
              <div className="font-serif text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
                {it.t}
              </div>
            </div>
            <div className="col-span-12 text-sm text-foreground/70 md:col-span-4">
              {it.d}
            </div>
            <div className="col-span-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
              {it.tool}
            </div>
            <div className="col-span-6 text-right font-mono text-[10px] uppercase tracking-[0.3em] md:col-span-1">
              {it.status === "done" ? (
                <span className="text-emerald-400/80">Completed</span>
              ) : (
                <span className="text-amber-400/80">In Progress</span>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* ── Featured Web Project: CareConnect ── */}
      <div className="mt-32">
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
          05 — Web Development
        </div>
        <h2 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
          Beyond the <span className="italic text-foreground/70">machine.</span>
        </h2>

        <div className="mt-16 grid gap-12 border border-border p-8 md:grid-cols-2 md:p-12">
          {/* left */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              {webProject.tool}
            </div>
            <h3 className="mt-4 font-serif text-5xl md:text-6xl">
              {webProject.t}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-lg">
              {webProject.d}
            </p>
            <ul className="mt-6 space-y-3">
              {webProject.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-4 text-sm text-foreground/70"
                >
                  <span className="h-px w-5 flex-shrink-0 bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={webProject.link}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="mt-8 inline-flex items-center gap-3 border-b border-primary pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              View Live Project →
            </a>
          </div>

          {/* right */}
          <div className="flex flex-col items-center justify-center gap-6 border border-primary/20 bg-primary/5 p-12">
            <div className="absolute right-4 top-4 hidden border border-primary px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-primary md:block">
              Featured
            </div>
            <div className="font-serif text-xl tracking-wide text-foreground/70">
              {webProject.team}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {webProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
