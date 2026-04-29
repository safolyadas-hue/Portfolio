# Portfolio 3D Upgrade — Plan

Rebuild your existing portfolio (S. Das / Mech + Embedded) into a modern, Awwwards-grade experience built around an **interactive particle/shader system** and **WebGL section transitions**, while keeping every word of your current copy, structure, and dark editorial aesthetic.

The output will be a clean React + Vite project you can push to GitHub Pages or open directly in Cursor / any AI coding agent for further edits.

---

## Recommended Stack

Chosen because it gives the best balance of performance, modular code, and Cursor-friendliness for the "particle field + WebGL transitions" direction:

- **Vite + React 18 + TypeScript** — fast HMR, easy export
- **@react-three/fiber 8** + **@react-three/drei 9** — declarative Three.js
- **three ^0.160** — WebGL renderer
- **GLSL shaders** (custom `.glsl` files via `vite-plugin-glsl`) — for particles & transitions
- **GSAP + ScrollTrigger** — timeline + scroll choreography
- **Lenis** — buttery smooth scroll (drives ScrollTrigger)
- **Tailwind CSS** — keep your existing typography / spacing tokens
- **Framer Motion** — DOM micro-interactions (text reveals, button states)

All sections remain real DOM (good for SEO / copy editing). The 3D layer sits behind/over them on a fixed full-screen `<canvas>`.

---

## Architecture

```text
┌─────────────────────────────────────────────┐
│  <CanvasLayer/>  fixed, z=0, pointer-events │
│   ├─ ParticleField      (hero + ambient)    │
│   ├─ ShaderBackground   (fluid noise)       │
│   └─ TransitionPlane    (section curtains)  │
├─────────────────────────────────────────────┤
│  <ScrollContainer/> Lenis-wrapped, z=10     │
│   ├─ Hero          (00 — Intro)             │
│   ├─ About         (01 — Who I Am)          │
│   ├─ Skills        (02 — Toolkit)           │
│   ├─ Workshop      (machining grid)         │
│   ├─ Work          (projects)               │
│   ├─ Space         (extras)                 │
│   └─ Contact                                │
└─────────────────────────────────────────────┘
   <CustomCursor/>  +  <Preloader/>
```

A single `useScrollProgress()` hook publishes scroll state to the canvas via Zustand, so the 3D scene reacts to which section is in view (no duplicated ScrollTriggers).

---

## What Each Section Gets

**Hero**
- Full-screen GPU **particle field** (~50k particles) forming a subtle wireframe of a mechanical part (gear / piston). Particles drift, react to mouse via curl noise, and reassemble on hover.
- Title "Safolya Das" splits into characters and reveals with a mask + slight 3D tilt on mouse.
- Background: dark fluid shader (Perlin/simplex noise) with deep red/amber accent matching your current palette.

**About (01)**
- Particles morph into a slow-rotating point-cloud portrait silhouette as section enters.
- Stat counters (9.39, 20, 7+, 9) animate with GSAP on reveal.

**Skills (02)**
- Each skill card is a real DOM tile with a small per-card WebGL canvas showing a rotating low-poly icon (gear, chip, antenna). Magnetic hover + RGB-split on hover.

**Workshop / Machining**
- Horizontal scroll-pinned section. Background shader shifts to a brushed-metal normal map; particles align to a CNC grid.

**Work / Projects**
- Project thumbnails use a **WebGL distortion plane** (à la `hover-effect.js`): mouse hover triggers displacement-map ripple. Click → curtain transition into project detail.

**Space + Contact**
- Particles dissipate into a starfield. Magnetic CTA button with a shader-based liquid fill on hover.

---

## WebGL Section Transitions

A persistent fullscreen plane in the canvas layer plays one of three transition shaders when you scroll between sections or click a nav link:

1. **Ripple distortion** (default between content sections)
2. **RGB split + slice** (Hero → About)
3. **Ink bleed / smoke dissolve** (Work → Project detail)

Driven by GSAP timelines synced with Lenis scroll velocity.

---

## Custom Cursor & Micro-interactions

- Circular cursor that scales + inverts on interactive elements
- Magnetic buttons (CTA, nav links)
- Split-text reveals on every heading via GSAP SplitText (free fallback included)
- Scroll-velocity-based skew on body text

---

## Performance (Full 3D everywhere, as requested)

- Single shared `<Canvas>` with `dpr={[1, 1.75]}` cap
- Instanced points + GPU compute via shaders (no per-frame JS loops over particles)
- Frustum culling + `frameloop="demand"` where possible
- Asset preloader with progress bar before first paint
- Lazy-loaded shader chunks per section

No mobile fallback — same experience everywhere (you confirmed). I'll still keep the particle count adaptive to GPU tier via `detect-gpu` so weaker devices don't crash, but visual fidelity stays full.

---

## Export / Handoff to Cursor

Project will be a standard Vite repo:

```text
portfolio/
├─ src/
│  ├─ canvas/        (R3F scene, particles, transitions)
│  ├─ shaders/       (.glsl files, commented)
│  ├─ sections/      (Hero, About, Skills, ...)
│  ├─ components/    (Cursor, Preloader, MagneticButton)
│  ├─ hooks/         (useLenis, useScrollProgress, useGPUTier)
│  └─ store/         (zustand)
├─ public/
├─ README.md         (setup, deploy to GitHub Pages, edit guide)
└─ vite.config.ts    (base path preset for /My-portfolio/)
```

`README.md` will include:
- `npm install && npm run dev`
- Where to edit copy, swap project images, tweak particle counts / colors
- `npm run build` + GitHub Pages deploy steps (keeps your existing URL working)
- A "prompt cheat-sheet" for asking Cursor to extend specific sections

---

## Build Order

1. Scaffold Vite + React + Tailwind, port all existing copy into typed section components
2. Lenis + GSAP ScrollTrigger + custom cursor + preloader
3. Canvas layer + shader background + particle field (hero)
4. Section-aware particle morphs + scroll-driven camera
5. WebGL section transitions + project hover distortion
6. Polish: magnetic buttons, split-text reveals, stat counters, audio toggle (optional)
7. README + GitHub Pages config

Nothing from your current site is lost — all text, sections, stats, and links carry over verbatim. The upgrade is purely additive on the visual/interaction layer.