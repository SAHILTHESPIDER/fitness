import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";
import { Barbell, Kettlebell, Sparks } from "./equipment";
import { detectWebGL, prefersReducedMotion } from "./webgl";

function Studio() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = texture;
    return () => {
      texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Rig({ model, accent, secondary, progressRef, lite, shadowY }) {
  const group = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spin = useRef(0.4);

  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const progress = progressRef.current || 0;
    spin.current += delta * (lite ? 0.15 : 0.28);
    const angle = 0.35 + progress * 1.15;
    const radius = model === "kettlebell" ? 3.5 - progress * 0.35 : 4.5 - progress * 0.7;
    const px = pointer.current.x * 0.35;
    const py = pointer.current.y * 0.18;
    const camera = state.camera;

    if (model === "kettlebell") {
      camera.position.x = Math.sin(angle) * 1.15 + px;
      camera.position.y = 0.35 + py + progress * 0.15;
      camera.position.z = Math.cos(angle) * radius;
    } else {
      camera.position.x = Math.cos(angle) * radius + px;
      camera.position.y = 0.22 + py;
      camera.position.z = Math.sin(angle) * radius;
    }
    camera.lookAt(0, 0, 0);

    if (group.current) {
      group.current.rotation.y = spin.current + progress * 0.6;
    }
  });

  return (
    <>
      <Studio />
      <ambientLight intensity={0.35} />
      <spotLight position={[4, 5, 3]} intensity={80} angle={0.45} penumbra={0.6} color="#fff7ea" />
      <spotLight position={[-4, 2, -2]} intensity={40} angle={0.5} penumbra={0.8} color={accent} />
      <pointLight position={[0, 1.4, 2]} intensity={8} color={secondary || accent} />
      <group ref={group}>
        {model === "kettlebell" ? (
          <Kettlebell accent={accent} />
        ) : (
          <Barbell accent={accent} secondary={secondary} />
        )}
      </group>
      <Sparks color={accent} count={lite ? 28 : 90} />
      <ContactShadows position={[0, shadowY, 0]} opacity={0.45} scale={7} blur={2.4} far={3.2} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, shadowY, 0]}>
        <circleGeometry args={[2.8, 64]} />
        <meshStandardMaterial color="#05070c" metalness={0.65} roughness={0.35} />
      </mesh>
    </>
  );
}

function beatOpacity(progress, index) {
  const local = progress * 2;
  if (index === 0) return THREE.MathUtils.clamp(1 - local, 0, 1);
  if (index === 1) return THREE.MathUtils.clamp(1 - Math.abs(local - 1), 0, 1);
  return THREE.MathUtils.clamp(local - 1, 0, 1);
}

export default function StoryHero({
  model = "barbell",
  accent = "#d6ff4a",
  secondary = "#7af0ff",
  clear = "#070b14",
  shadowY = -0.7,
  beats,
  font,
}) {
  const wrap = useRef(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState("pending");
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const narrow = window.matchMedia("(max-width: 760px)").matches;
    setLite(narrow || reduced);
    setMode(!detectWebGL() || reduced ? "fallback" : "webgl");
  }, []);

  useEffect(() => {
    const node = wrap.current;
    if (!node) return undefined;
    let frame = 0;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      const next = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      progressRef.current = next;
      setProgress((prev) => (Math.abs(prev - next) > 0.012 ? next : prev));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={wrap} className={lite ? "relative h-[165vh]" : "relative h-[240vh]"}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {mode === "webgl" ? (
          <Canvas
            className="pointer-events-none"
            dpr={lite ? [1, 1.15] : [1, 1.6]}
            camera={{ position: [4.2, 0.3, 0.2], fov: 32 }}
            gl={{
              antialias: !lite,
              alpha: false,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.12;
              gl.setClearColor(clear, 1);
            }}
          >
            <Rig
              model={model}
              accent={accent}
              secondary={secondary}
              progressRef={progressRef}
              lite={lite}
              shadowY={shadowY}
            />
            {lite ? null : (
              <EffectComposer multisampling={0}>
                <Bloom intensity={0.45} luminanceThreshold={0.72} mipmapBlur />
                <Vignette offset={0.2} darkness={0.62} />
              </EffectComposer>
            )}
          </Canvas>
        ) : (
          <div className="absolute inset-0" style={{ background: clear }} />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-[#070b14]/50" />

        <div className="absolute inset-0 flex items-end px-5 pb-10 sm:items-center sm:px-10 sm:pb-0">
          <div className="relative h-64 w-full max-w-3xl sm:h-72" style={font}>
            {beats.map((beat, index) => (
              <div
                key={beat.title}
                className="absolute max-w-3xl pr-6 transition-opacity duration-200"
                style={{ opacity: beatOpacity(progress, index) }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: accent }}>
                  {beat.kicker}
                </p>
                <h1 className="mt-3 text-5xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">{beat.title}</h1>
                <p className="mt-4 max-w-md text-base text-white/80 sm:text-lg">{beat.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
