"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientCausticsMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorBg: { value: new THREE.Color("#F5F1E8") },
      uColorWarm: { value: new THREE.Color("#DFC380") },
      uColorGlow: { value: new THREE.Color("#FAF7F2") },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorBg;
    uniform vec3 uColorWarm;
    uniform vec3 uColorGlow;
    varying vec2 vUv;

    // Simplex noise helper
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      float t = uTime * 0.15;

      // Soft light caustics layering
      float n1 = snoise(st * 2.5 + vec2(t * 0.8, t * 0.5));
      float n2 = snoise(st * 4.0 - vec2(t * 0.5, t * 1.0));
      float caustics = pow(abs(n1 + n2), 2.2) * 0.45;

      // Soft radial lighting bloom centered in top middle
      float dist = length(st - vec2(0.5, 0.4));
      float vignette = smoothstep(0.8, 0.2, dist);

      vec3 color = mix(uColorBg, uColorGlow, vignette * 0.6);
      color = mix(color, uColorWarm, caustics * vignette * 0.5);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function HeroCaustics() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
        className="w-full h-full"
      >
        <AmbientCausticsMesh />
      </Canvas>
    </div>
  );
}
