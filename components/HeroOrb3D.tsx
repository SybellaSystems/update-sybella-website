"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import type { Mesh } from "three";

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

function StaticOrbFallback() {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      background: "radial-gradient(circle at 32% 28%, #BFDBFE 0%, #60A5FA 18%, #2563EB 45%, #1D4ED8 75%, #1E3A8A 100%)",
      boxShadow: "0 50px 120px rgba(29,78,216,0.45), 0 12px 32px rgba(29,78,216,0.25), inset -16px -28px 60px rgba(15,23,42,0.45), inset 16px 24px 50px rgba(255,255,255,0.22)"
    }} />
  );
}

function GlassyKnot() {
  const meshRef = useRef<Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.22;
    // Subtle parallax tilt from cursor
    meshRef.current.rotation.z += (mouse.x * 0.15 - meshRef.current.rotation.z) * 0.05;
    meshRef.current.position.y += (mouse.y * 0.15 - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.82, 0.30, 256, 32, 2, 3]} />
      <MeshTransmissionMaterial
        thickness={0.55}
        roughness={0.06}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.06}
        anisotropy={0.45}
        distortion={0.25}
        distortionScale={0.4}
        temporalDistortion={0.08}
        color="#3B82F6"
        attenuationColor="#1E3A8A"
        attenuationDistance={1.6}
        backside
      />
    </mesh>
  );
}

export default function HeroOrb3D() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(detectWebGL());
  }, []);

  if (supported === null) return null;
  if (!supported) return <StaticOrbFallback />;

  return (
    <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          const onLost = (e: Event) => e.preventDefault();
          gl.domElement.addEventListener("webglcontextlost", onLost, false);
        }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#FFFFFF" />
        <pointLight position={[-5, -3, 3]} intensity={0.9} color="#60A5FA" />
        <pointLight position={[0, -5, -2]} intensity={0.6} color="#1D4ED8" />
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <GlassyKnot />
        </Suspense>
      </Canvas>
    </div>
  );
}
