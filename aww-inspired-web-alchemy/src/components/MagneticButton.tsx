import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, strength = 0.4, className, onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      xTo(x);
      yTo(y);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      data-cursor="hover"
      className={cn(
        "magnetic inline-flex items-center justify-center border border-primary/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}
