import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 320;

function Dust() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 16;
      pos[i3 + 1] = (Math.random() - 0.5) * 12;
      pos[i3 + 2] = (Math.random() - 0.5) * 8;

      vel[i3] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 1] = 0.002 + Math.random() * 0.004;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, pointer.x * 6, 0.05);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, pointer.y * 4, 0.05);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const dt = Math.min(delta, 0.05);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      array[i3] += velocities[i3] * (dt * 60);
      array[i3 + 1] += velocities[i3 + 1] * (dt * 60);
      array[i3 + 2] += velocities[i3 + 2] * (dt * 60);

      const dx = array[i3] - mx;
      const dy = array[i3 + 1] - my;
      const distSq = dx * dx + dy * dy;
      if (distSq < 4 && distSq > 0.01) {
        const force = (1 - distSq / 4) * 0.014;
        array[i3] += (dx / Math.sqrt(distSq)) * force;
        array[i3 + 1] += (dy / Math.sqrt(distSq)) * force;
      }

      if (array[i3 + 1] > 6) array[i3 + 1] = -6;
      if (array[i3] > 8) array[i3] = -8;
      if (array[i3] < -8) array[i3] = 8;
    }

    posAttr.needsUpdate = true;

    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, pointer.x * 0.04, 0.02);
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -pointer.y * 0.03, 0.02);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.036}
        color="#d9a84d"
        transparent
        opacity={0.68}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block" aria-hidden>
      <Canvas dpr={1} camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false, alpha: true }}>
        <Dust />
      </Canvas>
    </div>
  );
}

