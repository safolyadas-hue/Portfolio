import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useScene } from "@/store/scene";

/**
 * GPU particle field. Particles are arranged on a torus by default and morph
 * into different shapes per section (sphere, grid, helix, dispersed).
 * Mouse position adds curl-noise repulsion in shader.
 */

const COUNT = 28000;

const vert = /* glsl */ `
  attribute vec3 aTarget0; // torus
  attribute vec3 aTarget1; // sphere
  attribute vec3 aTarget2; // grid
  attribute vec3 aTarget3; // helix
  attribute vec3 aTarget4; // dispersed
  attribute float aSeed;

  uniform float uTime;
  uniform float uSection;       // smoothed 0..6
  uniform vec2  uMouse;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vAlpha;
  varying float vSeed;

  vec3 pickTarget(float s){
    // blend between adjacent integer indices
    float idx = clamp(s, 0.0, 5.0);
    float i0 = floor(idx);
    float f  = idx - i0;
    vec3 a, b;
    if (i0 < 0.5)      { a = aTarget0; b = aTarget1; }
    else if (i0 < 1.5) { a = aTarget1; b = aTarget2; }
    else if (i0 < 2.5) { a = aTarget2; b = aTarget3; }
    else if (i0 < 3.5) { a = aTarget3; b = aTarget4; }
    else if (i0 < 4.5) { a = aTarget4; b = aTarget0; }
    else               { a = aTarget0; b = aTarget0; }
    return mix(a, b, f);
  }

  void main(){
    vec3 target = pickTarget(uSection);

    // gentle drift
    float t = uTime * 0.4 + aSeed * 6.2831;
    vec3 drift = vec3(sin(t)*0.03, cos(t*0.8)*0.03, sin(t*1.3)*0.03);

    // mouse repulsion in screen-ish XY
    vec2 toMouse = target.xy - uMouse * 2.5;
    float d = length(toMouse);
    vec2 push = normalize(toMouse + 0.0001) * exp(-d*1.6) * 0.5;

    vec3 pos = target + drift + vec3(push, 0.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = uSize * (0.6 + aSeed * 0.8);
    gl_PointSize = size * uPixelRatio * (1.0 / -mv.z);

    vAlpha = 0.55 + 0.45 * sin(t);
    vSeed = aSeed;
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying float vAlpha;
  varying float vSeed;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uColorA, uColorB, vSeed);
    gl_FragColor = vec4(col, soft * vAlpha * 0.9);
  }
`;

function buildTargets() {
  const t0 = new Float32Array(COUNT * 3); // torus
  const t1 = new Float32Array(COUNT * 3); // sphere
  const t2 = new Float32Array(COUNT * 3); // grid
  const t3 = new Float32Array(COUNT * 3); // helix
  const t4 = new Float32Array(COUNT * 3); // dispersed
  const seeds = new Float32Array(COUNT);

  const R = 1.6, r = 0.55;
  const side = Math.ceil(Math.sqrt(COUNT));

  for (let i = 0; i < COUNT; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;

    // torus
    t0[i * 3 + 0] = (R + r * Math.cos(v)) * Math.cos(u);
    t0[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u) * 0.55;
    t0[i * 3 + 2] = r * Math.sin(v);

    // sphere (fibonacci)
    const phi = Math.acos(1 - 2 * (i + 0.5) / COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const sR = 1.4;
    t1[i * 3 + 0] = sR * Math.sin(phi) * Math.cos(theta);
    t1[i * 3 + 1] = sR * Math.sin(phi) * Math.sin(theta);
    t1[i * 3 + 2] = sR * Math.cos(phi);

    // grid
    const gx = (i % side) / side - 0.5;
    const gy = Math.floor(i / side) / side - 0.5;
    t2[i * 3 + 0] = gx * 4.5;
    t2[i * 3 + 1] = gy * 2.6;
    t2[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

    // helix
    const hT = (i / COUNT) * Math.PI * 8;
    t3[i * 3 + 0] = Math.cos(hT) * 1.3;
    t3[i * 3 + 1] = (i / COUNT - 0.5) * 3.5;
    t3[i * 3 + 2] = Math.sin(hT) * 1.3;

    // dispersed cloud
    t4[i * 3 + 0] = (Math.random() - 0.5) * 5.5;
    t4[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
    t4[i * 3 + 2] = (Math.random() - 0.5) * 2.5;

    seeds[i] = Math.random();
  }

  return { t0, t1, t2, t3, t4, seeds };
}

const SECTION_INDEX: Record<string, number> = {
  hero: 0, about: 1, skills: 2, workshop: 3, work: 4, space: 5, education: 5, contact: 5,
};

export default function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const sec = useRef(0);
  const { gl } = useThree();

  const geom = useMemo(() => {
    const { t0, t1, t2, t3, t4, seeds } = buildTargets();
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(t0.slice(), 3));
    g.setAttribute("aTarget0", new THREE.BufferAttribute(t0, 3));
    g.setAttribute("aTarget1", new THREE.BufferAttribute(t1, 3));
    g.setAttribute("aTarget2", new THREE.BufferAttribute(t2, 3));
    g.setAttribute("aTarget3", new THREE.BufferAttribute(t3, 3));
    g.setAttribute("aTarget4", new THREE.BufferAttribute(t4, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSection: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 18 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColorA: { value: new THREE.Color("#f4a261") },
      uColorB: { value: new THREE.Color("#e76f51") },
    }),
    [gl],
  );

  useFrame((state, delta) => {
    if (!matRef.current || !ref.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += delta;
    const { mouse, active } = useScene.getState();
    u.uMouse.value.lerp(new THREE.Vector2(mouse.x, -mouse.y), 0.06);
    const target = SECTION_INDEX[active] ?? 0;
    sec.current += (target - sec.current) * 0.025;
    u.uSection.value = sec.current;

    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = mouse.y * 0.08;
  });

  return (
    <points ref={ref} geometry={geom} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
