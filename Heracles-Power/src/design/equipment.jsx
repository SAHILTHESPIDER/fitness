import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useKnurl() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#9aa3ad";
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = "#f4f7fb";
    ctx.lineWidth = 2;
    for (let i = -128; i < 256; i += 7) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 128, 128);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i, 128);
      ctx.lineTo(i + 128, 0);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 2);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function Bumper({ x, radius, thickness, color, metal = "#d5dbe3" }) {
  const geometry = useMemo(() => {
    const hub = radius * 0.28;
    const points = [
      new THREE.Vector2(hub, -thickness * 0.2),
      new THREE.Vector2(hub + radius * 0.04, -thickness * 0.55),
      new THREE.Vector2(radius * 0.9, -thickness * 0.62),
      new THREE.Vector2(radius, -thickness * 0.3),
      new THREE.Vector2(radius, thickness * 0.3),
      new THREE.Vector2(radius * 0.9, thickness * 0.62),
      new THREE.Vector2(hub + radius * 0.04, thickness * 0.55),
      new THREE.Vector2(hub, thickness * 0.2),
    ];
    const lathe = new THREE.LatheGeometry(points, 72);
    lathe.rotateZ(Math.PI / 2);
    return lathe;
  }, [radius, thickness]);

  return (
    <group position={[x, 0, 0]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.22}
          roughness={0.38}
          clearcoat={0.85}
          clearcoatRoughness={0.22}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <cylinderGeometry args={[radius * 0.3, radius * 0.3, thickness * 0.7, 32]} />
        <meshPhysicalMaterial color={metal} metalness={1} roughness={0.18} />
      </mesh>
    </group>
  );
}

export function Barbell({ accent = "#d6ff4a", secondary = "#3ee0ff" }) {
  const knurl = useKnurl();
  const steel = { color: "#e7edf4", metalness: 1, roughness: 0.16, clearcoat: 0.4, clearcoatRoughness: 0.08 };

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.028, 0.92, 32]} />
        <meshPhysicalMaterial {...steel} bumpMap={knurl} bumpScale={0.004} />
      </mesh>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.048, 0.048, 0.42, 28]} />
          <meshPhysicalMaterial color="#c5ced8" metalness={1} roughness={0.22} />
        </mesh>
      ))}
      {[-0.86, 0.86].map((x) => (
        <mesh key={`collar-${x}`} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.06, 28]} />
          <meshPhysicalMaterial color="#f3f6fa" metalness={1} roughness={0.12} />
        </mesh>
      ))}
      <Bumper x={-1.02} radius={0.34} thickness={0.08} color={secondary} />
      <Bumper x={1.02} radius={0.34} thickness={0.08} color={secondary} />
      <Bumper x={-1.14} radius={0.46} thickness={0.1} color={accent} />
      <Bumper x={1.14} radius={0.46} thickness={0.1} color={accent} />
      <Bumper x={-1.26} radius={0.4} thickness={0.08} color="#102033" metal="#9eb0c4" />
      <Bumper x={1.26} radius={0.4} thickness={0.08} color="#102033" metal="#9eb0c4" />
    </group>
  );
}

export function Kettlebell({ accent = "#ff3b30" }) {
  const body = useMemo(() => {
    const points = [
      [0.04, -0.78],
      [0.38, -0.76],
      [0.66, -0.48],
      [0.7, -0.08],
      [0.6, 0.28],
      [0.38, 0.5],
      [0.2, 0.62],
      [0.11, 0.72],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(points, 80);
  }, []);

  return (
    <group position={[0, 0.05, 0]}>
      <mesh geometry={body}>
        <meshPhysicalMaterial
          color={accent}
          metalness={0.55}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.16, 0.16, 32]} />
        <meshPhysicalMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.98, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.045, 24, 64]} />
        <meshPhysicalMaterial color="#f2f4f7" metalness={1} roughness={0.14} />
      </mesh>
      <mesh position={[0, 0.15, 0.62]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshPhysicalMaterial color="#fff4ef" metalness={0.2} roughness={0.15} emissive={accent} emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

export function Sparks({ color, count = 80 }) {
  const ref = useRef(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color={color} size={0.03} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}
