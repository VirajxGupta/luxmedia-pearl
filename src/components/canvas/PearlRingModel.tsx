"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PearlRingModelProps {
  scrollProgress?: number;
  finish?: "yellow" | "rose" | "white";
  isMobile?: boolean;
}

export default function PearlRingModel({
  scrollProgress = 0,
  finish = "yellow",
  isMobile = false,
}: PearlRingModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringBandRef = useRef<THREE.Mesh>(null);
  const pearlRef = useRef<THREE.Mesh>(null);

  // Material color presets
  const goldColor = useMemo(() => {
    switch (finish) {
      case "rose":
        return new THREE.Color("#E2B49A");
      case "white":
        return new THREE.Color("#E0E4E8");
      case "yellow":
      default:
        return new THREE.Color("#D8B868");
    }
  }, [finish]);

  // Create custom curved ring band profile geometry
  const bandGeometry = useMemo(() => {
    // Elegant comfort-fit band profile
    const shape = new THREE.Shape();
    const width = 0.22;
    const height = 0.12;

    // Rounded rectangle profile
    shape.moveTo(-width / 2, 0);
    shape.lineTo(width / 2, 0);
    shape.quadraticCurveTo(width / 2 + 0.03, height / 2, width / 2, height);
    shape.lineTo(-width / 2, height);
    shape.quadraticCurveTo(-width / 2 - 0.03, height / 2, -width / 2, 0);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 120,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      extrudePath: new THREE.CatmullRomCurve3(
        Array.from({ length: 64 }, (_, i) => {
          const theta = (i / 64) * Math.PI * 2;
          const radius = 1.1;
          return new THREE.Vector3(
            Math.cos(theta) * radius,
            Math.sin(theta) * radius,
            0
          );
        }),
        true
      ),
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isMobile) {
      // Smooth continuous front view auto-spin on Y axis
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.08;
      groupRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.04;
    } else {
      // Direct front portrait view: ring band circle faces forward, rotating on vertical Y axis with scroll
      const targetRotX = Math.sin(scrollProgress * Math.PI) * 0.12 + state.pointer.y * 0.15; // Upright front orientation
      const targetRotY = scrollProgress * Math.PI * 2.5 + state.pointer.x * 0.35; // 360 rotation around Y axis
      const targetRotZ = Math.sin(scrollProgress * Math.PI * 2) * 0.05;

      // Smooth lerp easing for quiet luxury feel
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.08;

      // Gentle floating oscillation
      groupRef.current.position.y = -0.42 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.42, 0]} scale={isMobile ? 0.65 : 0.76}>
      {/* Main Sculpted Gold Ring Band */}
      <mesh ref={ringBandRef} geometry={bandGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={goldColor}
          metalness={0.94}
          roughness={0.14}
          clearcoat={0.4}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Bezel Base & Prongs Crown */}
      <group position={[0, 1.1, 0]}>
        {/* Crown Setting Base Collar */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.28, 0.18, 32]} />
          <meshPhysicalMaterial
            color={goldColor}
            metalness={0.94}
            roughness={0.14}
            clearcoat={0.4}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* 4 Organic Gold Prongs */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0.32, 0.22, 0]} rotation={[0, 0, -0.22]} castShadow>
              <cylinderGeometry args={[0.035, 0.045, 0.38, 16]} />
              <meshPhysicalMaterial
                color={goldColor}
                metalness={0.94}
                roughness={0.14}
                clearcoat={0.4}
                envMapIntensity={2.0}
              />
            </mesh>
            {/* Prong Rounded Claw Tip */}
            <mesh position={[0.26, 0.4, 0]} castShadow>
              <sphereGeometry args={[0.042, 16, 16]} />
              <meshPhysicalMaterial
                color={goldColor}
                metalness={0.94}
                roughness={0.14}
                clearcoat={0.4}
              />
            </mesh>
          </group>
        ))}

        {/* Inset Accent Gold Ring Detail around Base */}
        <mesh position={[0, 0.12, 0]}>
          <torusGeometry args={[0.42, 0.025, 16, 48]} />
          <meshPhysicalMaterial
            color={goldColor}
            metalness={0.96}
            roughness={0.1}
            clearcoat={0.6}
          />
        </mesh>

        {/* Grade AAA South Sea Pearl */}
        <mesh ref={pearlRef} position={[0, 0.48, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.54, 64, 64]} />
          <meshPhysicalMaterial
            color="#FAF6F0"
            roughness={0.11}
            metalness={0.04}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            transmission={0.18}
            thickness={0.6}
            ior={1.52}
            iridescence={0.88}
            iridescenceIOR={1.33}
            iridescenceThicknessRange={[120, 380]}
            reflectivity={0.85}
            envMapIntensity={1.6}
          />
        </mesh>

        {/* Soft Inner Pearl Luster Glow Core */}
        <mesh position={[0, 0.48, 0]}>
          <sphereGeometry args={[0.46, 32, 32]} />
          <meshBasicMaterial
            color="#FFFDF7"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
}
