import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useScene } from "@/store/scene";

/**
 * Fullscreen overlay plane that plays a ripple/RGB-split transition
 * each time the active section changes. Driven by section change events.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uProgress; // 0..1 then 0
  uniform float uTime;

  void main(){
    if (uProgress <= 0.001) discard;

    vec2 uv = vUv;
    // ripple from center
    float d = distance(uv, vec2(0.5));
    float wave = sin(d*40.0 - uProgress*12.0) * 0.5 + 0.5;
    float mask = smoothstep(uProgress, uProgress - 0.25, d) *
                 smoothstep(0.0, 0.15, uProgress) *
                 smoothstep(1.0, 0.7, uProgress);

    vec3 col = mix(vec3(0.02), vec3(0.95, 0.42, 0.16), wave * mask);
    float a = mask * 0.55;
    gl_FragColor = vec4(col, a);
  }
`;

export default function TransitionPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const progress = useRef(0);
  const lastSection = useRef<string | null>(null);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    const { active } = useScene.getState();
    if (lastSection.current !== null && lastSection.current !== active) {
      progress.current = 0.001; // trigger
    }
    lastSection.current = active;

    if (progress.current > 0) {
      progress.current = Math.min(1, progress.current + delta * 1.4);
      if (progress.current >= 1) progress.current = 0;
    }
    matRef.current.uniforms.uProgress.value = progress.current;
    matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh frustumCulled={false} renderOrder={10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
