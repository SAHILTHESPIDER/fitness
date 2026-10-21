import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Plate({ position, radius, thickness, color }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[radius, radius, thickness, 40]} />
      <meshStandardMaterial color={color} metalness={0.88} roughness={0.22} />
    </mesh>
  );
}

export function Dumbbell() {
  const ref = useRef(null);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    group.rotation.y += delta * 0.65;
    group.rotation.z = 0.38 + Math.sin(state.clock.elapsedTime * 0.55) * 0.07;
    group.position.y = Math.sin(state.clock.elapsedTime * 0.85) * 0.1;
  });

  return (
    <group ref={ref} rotation={[0.25, 0.5, 0.38]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 1.28, 24]} />
        <meshStandardMaterial color="#f4f1ea" metalness={0.96} roughness={0.14} />
      </mesh>
      <Plate position={[-0.5, 0, 0]} radius={0.15} thickness={0.07} color="#2c2c2c" />
      <Plate position={[0.5, 0, 0]} radius={0.15} thickness={0.07} color="#2c2c2c" />
      <Plate position={[-0.64, 0, 0]} radius={0.4} thickness={0.13} color="#e6b400" />
      <Plate position={[0.64, 0, 0]} radius={0.4} thickness={0.13} color="#e6b400" />
      <Plate position={[-0.78, 0, 0]} radius={0.28} thickness={0.07} color="#101010" />
      <Plate position={[0.78, 0, 0]} radius={0.28} thickness={0.07} color="#101010" />
    </group>
  );
}

export function Kettlebell() {
  const ref = useRef(null);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    group.rotation.y += delta * 0.5;
    group.rotation.z = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
    group.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.08;
  });

  return (
    <group ref={ref} position={[0, -0.15, 0]}>
      <mesh>
        <sphereGeometry args={[0.78, 48, 48]} />
        <meshStandardMaterial color="#f0c21a" metalness={0.74} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 0.28, 24]} />
        <meshStandardMaterial color="#171717" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <torusGeometry args={[0.34, 0.065, 16, 48]} />
        <meshStandardMaterial color="#141414" metalness={0.82} roughness={0.24} />
      </mesh>
    </group>
  );
}
