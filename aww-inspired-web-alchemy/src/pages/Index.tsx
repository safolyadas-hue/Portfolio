import { useEffect } from "react";
import CanvasLayer from "@/canvas/CanvasLayer";
import Nav from "@/components/Nav";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Workshop from "@/sections/Workshop";
import Work from "@/sections/Work";
import Space from "@/sections/Space";
import Education from "@/sections/Education";
import Contact from "@/sections/Contact";
import { useLenis } from "@/hooks/useLenis";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { useScene } from "@/store/scene";

const Index = () => {
  useLenis();
  useSectionObserver();
  const setMouse = useScene((s) => s.setMouse);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [setMouse]);

  return (
    <div className="relative grain">
      <Preloader />
      <CanvasLayer />
      <CustomCursor />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Workshop />
        <Work />
        <Space />
        <Education />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
