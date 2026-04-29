import { create } from "zustand";

export type SectionId =
  | "hero"
  | "about"
  | "skills"
  | "workshop"
  | "work"
  | "space"
  | "education"
  | "contact";

interface SceneState {
  active: SectionId;
  progress: number; // 0..1 page progress
  mouse: { x: number; y: number }; // -1..1
  ready: boolean;
  setActive: (id: SectionId) => void;
  setProgress: (p: number) => void;
  setMouse: (x: number, y: number) => void;
  setReady: (r: boolean) => void;
}

export const useScene = create<SceneState>((set) => ({
  active: "hero",
  progress: 0,
  mouse: { x: 0, y: 0 },
  ready: false,
  setActive: (active) => set({ active }),
  setProgress: (progress) => set({ progress }),
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setReady: (ready) => set({ ready }),
}));
