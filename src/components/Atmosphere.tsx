import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < values.length; i += 3) {
      const seed = i / 3;
      values[i] = ((seed * 37) % 100) / 10 - 5;
      values[i + 1] = ((seed * 71) % 100) / 10 - 5;
      values[i + 2] = ((seed * 53) % 100) / 12 - 5;
    }
    return values;
  }, []);
  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += Math.min(delta, .05) * .015;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * .025, .02);
  });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial size={.026} color="#d9a84d" transparent opacity={.58} sizeAttenuation depthWrite={false} /></points>;
}

export function Atmosphere() {
  return <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block" aria-hidden><Canvas dpr={1} camera={{ position: [0,0,5], fov: 60 }} gl={{ antialias: false, alpha: true }}><Dust /></Canvas></div>;
}
