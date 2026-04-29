import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useScene } from "@/store/scene";

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Animated fluid noise — dark editorial palette with amber accent
const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSection; // 0..7
  uniform vec2 uRes;

  // simplex-ish noise
  vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec2 mod289(vec2 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m; m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x/uRes.y, 1.0);

    float t = uTime * 0.08;
    float n1 = snoise(p*1.5 + vec2(t, -t*0.7));
    float n2 = snoise(p*3.0 - vec2(t*1.3, t));
    float n  = n1*0.6 + n2*0.4;

    // mouse-reactive warp
    float m = exp(-length(p - uMouse*vec2(uRes.x/uRes.y,1.0)*0.5)*2.5);
    n += m * 0.4;

    // base near-black
    vec3 base = vec3(0.035, 0.028, 0.025);
    // amber glow (matches --primary)
    vec3 amber = vec3(0.95, 0.42, 0.16);
    // deep wine for variety per section
    vec3 wine  = vec3(0.45, 0.06, 0.10);

    float sec = uSection;
    vec3 accent = mix(amber, wine, smoothstep(2.0, 5.0, sec));

    float glow = smoothstep(0.15, 0.85, n*0.5+0.5);
    vec3 col = base + accent * glow * 0.22;

    // vignette
    float vig = smoothstep(1.2, 0.35, length(p));
    col *= mix(0.55, 1.0, vig);

    // film grain
    float g = fract(sin(dot(uv*uRes, vec2(12.9898,78.233))) * 43758.5453);
    col += (g - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const SECTION_INDEX: Record<string, number> = {
  hero: 0, about: 1, skills: 2, workshop: 3, work: 4, space: 5, education: 6, contact: 7,
};

export default function ShaderBackground() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const targetSec = useRef(0);
  const currentSec = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSection: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += delta;
    const { mouse, active } = useScene.getState();
    u.uMouse.value.set(mouse.x, -mouse.y);
    u.uRes.value.set(state.size.width, state.size.height);
    targetSec.current = SECTION_INDEX[active] ?? 0;
    currentSec.current += (targetSec.current - currentSec.current) * 0.04;
    u.uSection.value = currentSec.current;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
