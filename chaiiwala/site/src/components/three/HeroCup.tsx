"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Cup() {
  const glass = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const prof: [number, number][] = [[0, 0], [0.42, 0], [0.5, 0.05], [0.52, 0.3], [0.58, 0.9], [0.6, 1.25], [0.66, 1.6], [0.66, 1.68], [0.62, 1.68], [0.6, 1.6], [0.55, 1.25], [0.53, 0.9], [0.47, 0.3], [0.45, 0.1], [0, 0.1]];
    prof.forEach(([x, y]) => pts.push(new THREE.Vector2(x, y)));
    return new THREE.LatheGeometry(pts, 64);
  }, []);
  const tea = useMemo(() => {
    const pts: THREE.Vector2[] = [[0, 0.11], [0.45, 0.11], [0.47, 0.3], [0.53, 0.9], [0.55, 1.2], [0.545, 1.42], [0, 1.42]].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 64);
  }, []);
  return (
    <group position={[0, -0.85, 0]}>
      <mesh geometry={tea}>
        <meshPhysicalMaterial color="#b9773f" roughness={0.35} clearcoat={0.6} clearcoatRoughness={0.2} />
      </mesh>
      <mesh position={[0, 1.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.545, 64]} />
        <meshPhysicalMaterial color="#c98a52" roughness={0.15} clearcoat={1} />
      </mesh>
      <mesh geometry={glass}>
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.28} roughness={0.05} metalness={0} clearcoat={1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

function makeSeeds(count: number) {
  let x = 1234567;
  const rnd = () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296; };
  return Array.from({ length: count }, () => ({ a: rnd() * Math.PI * 2, r: rnd() * 0.35, s: 0.5 + rnd() * 0.8, o: rnd() * 3 }));
}

function Steam({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const seeds = useMemo(() => makeSeeds(count), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    seeds.forEach((sd, i) => {
      const life = ((t * 0.35 * sd.s + sd.o) % 3) / 3;
      const y = 0.6 + life * 2.2;
      const wob = Math.sin(t * 1.3 + sd.a * 3) * 0.12 * life;
      dummy.position.set(Math.cos(sd.a + life * 2) * sd.r * (1 + life) + wob, y, Math.sin(sd.a + life * 2) * sd.r * (1 + life));
      const sc = 0.05 + life * 0.28;
      dummy.scale.setScalar(sc);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current!.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial color="#fff3e6" transparent opacity={0.07} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

function Spices() {
  const items = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ p: [Math.cos(i) * (1.3 + (i % 3) * 0.35), -0.6 + Math.sin(i * 1.7) * 0.9, Math.sin(i) * (1.3 + (i % 2) * 0.4)] as [number, number, number], r: i * 0.7, k: i % 3 })), []);
  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={1.2 + (i % 4) * 0.3} rotationIntensity={1.5} floatIntensity={1.2}>
          <mesh position={it.p} rotation={[it.r, it.r * 0.5, 0]}>
            {it.k === 0 ? <capsuleGeometry args={[0.05, 0.16, 4, 8]} /> : it.k === 1 ? <cylinderGeometry args={[0.035, 0.035, 0.42, 8]} /> : <dodecahedronGeometry args={[0.055]} />}
            <meshStandardMaterial color={it.k === 0 ? "#8fae6a" : it.k === 1 ? "#a35a2a" : "#3d2418"} roughness={0.7} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function HeroCup() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.5, 6.4], fov: 30 }} gl={{ antialias: true, alpha: true }} className="!absolute inset-0" data-cursor>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 2]} intensity={2.2} color="#fff1dd" />
      <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#ffb387" />
      <pointLight position={[0, 3, 3]} intensity={6} color="#ffd6b0" distance={8} />
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
        <Cup />
        <Steam />
      </Float>
      <Spices />
      <ContactShadows position={[0, -0.95, 0]} opacity={0.45} scale={6} blur={2.6} far={2} color="#4a2a17" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.9} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.9} />
    </Canvas>
  );
}
