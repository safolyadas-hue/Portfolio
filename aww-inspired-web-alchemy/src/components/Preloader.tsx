import { useEffect, useState } from "react";
import { useScene } from "@/store/scene";

export default function Preloader() {
  const ready = useScene((s) => s.ready);
  const setReady = useScene((s) => s.setReady);
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 8 + 4);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setReady(true);
          setTimeout(() => setHide(true), 900);
        }, 300);
      }
    }, 90);
    return () => clearInterval(id);
  }, [setReady]);

  if (hide) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-background transition-opacity duration-700"
      style={{ opacity: ready ? 0 : 1 }}
    >
      <div className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
        Loading experience
      </div>
      <div className="mt-8 h-px w-72 overflow-hidden bg-border">
        <div
          className="h-full bg-primary transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 font-mono text-[10px] tabular-nums text-muted-foreground">
        {Math.round(progress).toString().padStart(3, "0")}
      </div>
    </div>
  );
}
