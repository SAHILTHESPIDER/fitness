import { Component, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Dumbbell, Kettlebell } from "./objects";
import FallbackMark from "./FallbackMark";
import { detectWebGL, prefersReducedMotion } from "./webgl";

class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function Scene({ variant, floor }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#fff6d8" />
      <directionalLight position={[-4, 1.5, -2]} intensity={1.1} color="#ffc100" />
      <spotLight position={[0, 4, 3]} intensity={12} angle={0.45} penumbra={0.7} color="#ffffff" />
      {variant === "kettlebell" ? <Kettlebell /> : <Dumbbell />}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <circleGeometry args={[2.4, 48]} />
        <meshStandardMaterial color={floor} metalness={0.35} roughness={0.72} />
      </mesh>
    </>
  );
}

export default function HeroCanvas({ variant = "dumbbell", floor = "#121212", className = "" }) {
  const host = useRef(null);
  const [live, setLive] = useState(true);
  const [mode, setMode] = useState("pending");

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const webgl = detectWebGL();
    setMode(!webgl || reduced ? "fallback" : "webgl");
  }, []);

  useEffect(() => {
    const node = host.current;
    if (!node || mode !== "webgl") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setLive(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode]);

  const fallback = (
    <div className="grid h-full place-items-center p-6">
      <FallbackMark variant={variant} animate={mode !== "fallback"} />
    </div>
  );

  return (
    <div ref={host} className={className} data-testid="hero-3d">
      {mode === "webgl" ? (
        <SceneBoundary fallback={fallback}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.35, 4.4], fov: 34 }}
            frameloop={live ? "always" : "never"}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor("#000000", 0);
            }}
          >
            <Scene variant={variant} floor={floor} />
          </Canvas>
        </SceneBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
