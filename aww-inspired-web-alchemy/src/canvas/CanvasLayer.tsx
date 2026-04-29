import { Canvas } from "@react-three/fiber";
import ShaderBackground from "./ShaderBackground";
import ParticleField from "./ParticleField";
import TransitionPlane from "./TransitionPlane";

export default function CanvasLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ShaderBackground />
        <ParticleField />
        <TransitionPlane />
      </Canvas>
    </div>
  );
}
