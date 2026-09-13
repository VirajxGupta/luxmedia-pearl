"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import PearlRingModel from "./PearlRingModel";

interface RingCanvasProps {
  scrollProgress: number;
  finish: "yellow" | "rose" | "white";
  isMobile: boolean;
}

function CanvasFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border border-pearl-gold/40 border-t-pearl-gold animate-spin" />
    </div>
  );
}

export default function RingCanvas({
  scrollProgress,
  finish,
  isMobile,
}: RingCanvasProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.1, 5.0], fov: 35 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#F5F1E8"]} />
        <ambientLight intensity={0.7} color="#FAF7F2" />

        {/* Warm Rim Light from Top Right */}
        <directionalLight
          position={[4, 5, 3]}
          intensity={2.4}
          color="#FFF2D6"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Soft Cool Fill Light from Bottom Left */}
        <directionalLight
          position={[-4, -2, 2]}
          intensity={0.8}
          color="#E8E2D5"
        />

        {/* Highlight Specular Point Light on Pearl */}
        <pointLight
          position={[0, 2, 2]}
          intensity={1.2}
          color="#FFFFFF"
          distance={8}
        />

        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.6} />

          <PearlRingModel
            scrollProgress={scrollProgress}
            finish={finish}
            isMobile={isMobile}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.7}
            dampingFactor={0.05}
            enableDamping={true}
          />

          <ContactShadows
            position={[0, -1.25, 0]}
            opacity={0.4}
            scale={6}
            blur={2.2}
            far={3.5}
            color="#3D3528"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
