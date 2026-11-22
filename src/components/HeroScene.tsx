"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import { useThreePreference } from "@/components/chrome/ThreeProvider";

function CrystalField({ drift = false }: { drift?: boolean }) {
  const group = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const elapsed = useRef(0);
  const core = useMemo(() => new THREE.IcosahedronGeometry(1.35, 1), []);
  const shell = useMemo(() => new THREE.IcosahedronGeometry(1.75, 0), []);
  const torus = useMemo(() => new THREE.TorusGeometry(2.35, 0.055, 16, 120), []);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (group.current) {
      group.current.rotation.y += delta * (drift ? 0.16 : 0.28);
      group.current.rotation.x = Math.sin(elapsed.current * 0.45) * (drift ? 0.1 : 0.18);
      group.current.position.y = Math.sin(elapsed.current * 0.7) * (drift ? 0.05 : 0.08);
    }
    if (ring.current) {
      ring.current.rotation.z -= delta * (drift ? 0.22 : 0.4);
      ring.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={group} position={drift ? [2.35, 0.35, -0.4] : [1.55, 0.2, 0]} scale={drift ? 1.45 : 1.2}>
      <mesh geometry={core}>
        <meshStandardMaterial
          color="#2ec4b6"
          roughness={0.28}
          metalness={0.42}
          flatShading
        />
      </mesh>
      <mesh geometry={shell}>
        <meshBasicMaterial color="#9ad7ff" wireframe transparent opacity={drift ? 0.22 : 0.35} />
      </mesh>
      <mesh ref={ring} geometry={torus} rotation={[Math.PI / 2.6, 0.3, 0]}>
        <meshStandardMaterial
          color="#5eead4"
          emissive="#2ec4b6"
          emissiveIntensity={drift ? 0.35 : 0.55}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-1.85, -1.05, -0.25]} rotation={[0.5, 0.9, 0.2]}>
        <octahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial color="#4b6b88" roughness={0.4} metalness={0.25} flatShading />
      </mesh>
      <mesh position={[1.25, 1.35, -0.75]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#7aa7c9" roughness={0.35} metalness={0.2} flatShading />
      </mesh>
      {drift ? (
        <mesh position={[-2.6, 1.1, -1.2]} rotation={[0.2, 0.4, 0.1]}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#2a4a5c" roughness={0.5} metalness={0.3} flatShading />
        </mesh>
      ) : null}
    </group>
  );
}

export function HeroScene({
  subtle = false,
  viewport = false,
}: {
  subtle?: boolean;
  /** Fixed full-screen layer behind the whole docs chrome. */
  viewport?: boolean;
}) {
  const { enabled, ready } = useThreePreference();
  if (!ready || !enabled) return null;

  const shellClass = viewport
    ? subtle
      ? "hero-scene hero-scene--viewport hero-scene--docs pointer-events-none fixed inset-0 z-0 opacity-[0.42]"
      : "hero-scene hero-scene--viewport pointer-events-none fixed inset-0 z-0"
    : subtle
      ? "hero-scene pointer-events-none absolute inset-0 -z-10 opacity-35"
      : "hero-scene pointer-events-none absolute inset-0";

  return (
    <div className={shellClass} aria-hidden>
      <Canvas
        dpr={[1, viewport ? 1.5 : 1.75]}
        camera={{ position: viewport ? [0.35, 0.18, 5.1] : [0.15, 0.12, 4.5], fov: viewport ? 42 : 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={viewport ? 0.42 : 0.55} />
        <directionalLight position={[4, 5, 2]} intensity={viewport ? 1.1 : 1.45} color="#f2f7ff" />
        <directionalLight position={[-4, -1, -2]} intensity={0.85} color="#2ec4b6" />
        <pointLight position={[2, 1, 2]} intensity={viewport ? 0.65 : 0.9} color="#5eead4" />
        <CrystalField drift={viewport} />
      </Canvas>
    </div>
  );
}
