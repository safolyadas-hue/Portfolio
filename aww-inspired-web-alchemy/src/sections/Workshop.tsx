const ops = [
  { n: "01", t: "Welding", d: "Arc welding — joining metal with precision heat and control." },
  { n: "02", t: "Surface Grinding", d: "Achieving ultra-flat, precise surface finishes on metal workpieces." },
  { n: "03", t: "Threading", d: "Cutting precise helical threads on rods and bores." },
  { n: "04", t: "Knurling", d: "Creating textured grip patterns on cylindrical metal surfaces." },
  { n: "05", t: "Drilling & Tapping", d: "Boring clean holes and cutting internal threads to precision." },
  { n: "06", t: "Milling", d: "Removing material on multi-axis milling machines to form complex shapes." },
  { n: "07", t: "Cylindrical Grinding", d: "Producing perfectly round, smooth cylindrical surfaces." },
  { n: "08", t: "Step & Taper Turning", d: "Creating stepped diameters and angled tapers on a lathe." },
  { n: "09", t: "Casting", d: "Sand-casting basics, mould design, and metal pouring fundamentals." },
];

export default function Workshop() {
  return (
    <section id="workshop" className="relative px-8 py-32 md:py-48">
      <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
        03 — Workshop
      </div>
      <h2 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
        Hands on <span className="italic text-foreground/70">metal.</span>
      </h2>

      <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
        {ops.map((o) => (
          <div
            key={o.n}
            data-cursor="hover"
            className="group bg-background p-8 transition-colors hover:bg-secondary"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {o.n}
            </div>
            <div className="mt-6 font-serif text-3xl text-primary transition-transform duration-500 group-hover:translate-x-2">
              {o.t}
            </div>
            <div className="mt-3 text-sm leading-relaxed text-foreground/70">{o.d}</div>
            <div className="mt-4 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
