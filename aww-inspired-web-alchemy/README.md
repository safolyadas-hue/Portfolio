# Safolya Das — Portfolio (WebGL Edition)

Modern, Awwwards-style portfolio built with **React + Vite + TypeScript + Three.js (R3F) + GSAP + Lenis**.
Drop-in upgrade of the original GitHub Pages site — all original copy is preserved, with an interactive
particle/shader 3D layer, custom cursor, smooth scroll, and WebGL section transitions.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Deploy to GitHub Pages

1. In `vite.config.ts`, set `base: "/My-portfolio/"`.
2. Build: `npm run build`. Output is in `dist/`.
3. Push the contents of `dist/` to the `gh-pages` branch (or use the
   [`gh-pages`](https://www.npmjs.com/package/gh-pages) package):
   ```bash
   npm i -D gh-pages
   npx gh-pages -d dist
   ```
4. In your repo settings → Pages → set source to the `gh-pages` branch.

## Project layout

```
src/
├─ canvas/             R3F scene (single shared canvas)
│  ├─ CanvasLayer.tsx       full-screen fixed canvas wrapper
│  ├─ ShaderBackground.tsx  GLSL fluid noise + section-tinted accent
│  ├─ ParticleField.tsx     28k GPU particles, morph between 5 shapes
│  └─ TransitionPlane.tsx   ripple curtain played on section change
├─ sections/           Real-DOM content (Hero, About, Skills, …)
├─ components/         Nav, CustomCursor, Preloader, MagneticButton
├─ hooks/              useLenis, useSectionObserver
├─ store/scene.ts      Zustand store (active section, mouse, progress)
├─ pages/Index.tsx     Wires it all together
└─ index.css           Design tokens (HSL) + grain + fonts
```

## Editing

| Want to change…           | Edit                                                   |
| ------------------------- | ------------------------------------------------------ |
| Hero copy / title         | `src/sections/Hero.tsx`                                |
| About text & stats        | `src/sections/About.tsx`                               |
| Skill tiles               | `src/sections/Skills.tsx`                              |
| Project list              | `src/sections/Work.tsx`                                |
| Contact email             | `src/sections/Contact.tsx`                             |
| Colors / typography       | `src/index.css` (`--primary`, `--background`, fonts)   |
| Particle count / shapes   | `COUNT` and `buildTargets()` in `ParticleField.tsx`    |
| Background palette        | `frag` shader in `ShaderBackground.tsx` (vec3 colors)  |
| Section morph order       | `SECTION_INDEX` map in `ParticleField.tsx`             |
| Transition style          | `frag` shader in `TransitionPlane.tsx`                 |

## How the 3D reacts to scroll

1. Real DOM sections each have an `id` (`hero`, `about`, …).
2. `useSectionObserver` watches them with `IntersectionObserver` and writes the
   active id to the Zustand store.
3. The R3F canvas reads that state every frame:
   - `ShaderBackground` lerps a `uSection` uniform → tints the accent color.
   - `ParticleField` blends between 5 precomputed target shapes (torus, sphere,
     grid, helix, dispersed cloud) using a single shader.
   - `TransitionPlane` triggers a ripple shader when the active id changes.

No per-frame JS loops over particles — everything happens in the vertex shader.

## Cursor / Continue in your own editor

This repo is a standard Vite + React + TS project — no Lovable-specific runtime.
Open the folder in **Cursor**, **VS Code**, **Zed**, or any AI agent and ask for changes like:

> "Add a 6th particle morph target shaped like a gear and trigger it on the Workshop section."
>
> "Replace the project list with data from `projects.json` and add a detail page for each."
>
> "Swap the ripple transition shader for an ink-bleed effect using a noise texture."

All shaders live in `src/canvas/*.tsx` as inline GLSL strings — easy to extract
to `.glsl` files if you prefer.

## Performance notes

- Single shared `<Canvas>` (one WebGL context).
- `dpr={[1, 1.75]}` caps retina cost.
- Particles use `THREE.AdditiveBlending` + `depthWrite=false`.
- Lenis drives smooth scroll; ScrollTrigger is lazy-attached per section.

## License

Personal portfolio — all rights reserved by Safolya Das.
