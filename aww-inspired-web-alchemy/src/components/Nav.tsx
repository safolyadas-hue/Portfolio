import { useScene } from "@/store/scene";
import { getLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "workshop", label: "Workshop" },
  { id: "work", label: "Work" },
  { id: "space", label: "Space" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const active = useScene((s) => s.active);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-8 py-6 mix-difference">
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); go("hero"); }}
        data-cursor="hover"
        className="font-serif text-lg italic tracking-wide"
      >
        S.<span className="text-primary">Das</span>
      </a>
      <nav className="hidden gap-8 font-mono text-[11px] uppercase tracking-[0.3em] md:flex">
        {links.map((l) => (
          <button
            key={l.id}
            data-cursor="hover"
            onClick={() => go(l.id)}
            className={cn(
              "transition-colors hover:text-primary",
              active === l.id ? "text-primary" : "text-foreground/70",
            )}
          >
            {l.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
