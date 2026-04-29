import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const xTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor='hover']"));
    };
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/60 transition-[width,height,background-color] duration-300 mix-difference"
        style={{
          width: hover ? 56 : 28,
          height: hover ? 56 : 28,
          backgroundColor: hover ? "hsl(var(--primary) / 0.2)" : "transparent",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-difference"
      />
    </>
  );
}
