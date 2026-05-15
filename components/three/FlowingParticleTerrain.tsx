"use client";

/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform float uIntro;
uniform float uPixelRatio;
uniform vec2 uPointer;
varying float vIntensity;
varying float vDepth;

float wave(vec2 p) {
  float ridge = sin(p.x * 1.65 + uTime * 0.7);
  float longRoll = sin(p.y * 1.18 - uTime * 0.45);
  float cross = sin((p.x + p.y) * 1.05 + uTime * 0.52);
  float tight = sin(length(p + vec2(1.7, -2.3)) * 2.65 - uTime * 1.15);
  return ridge * 0.42 + longRoll * 0.34 + cross * 0.26 + tight * 0.14;
}

void main() {
  vec3 p = position;
  float terrain = wave(p.xz);
  float pointerWave = sin(distance(p.xz, uPointer * 3.0) * 4.0 - uTime * 2.0) * 0.045;

  p.y = terrain + pointerWave;
  p.z += sin(p.x * 0.55 + uTime * 0.28) * 0.2;
  p.y -= (1.0 - uIntro) * 2.6;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float ridgeLight = smoothstep(0.18, 0.95, terrain);
  float frontGlow = smoothstep(4.6, -5.2, p.z);
  float sideSweep = smoothstep(0.98, 0.12, abs(sin(p.x * 1.15 + p.z * 0.38 + uTime * 0.72)));
  vIntensity = max(ridgeLight, sideSweep * 0.75) * frontGlow;
  vDepth = frontGlow;

  gl_PointSize = (1.4 + vIntensity * 4.8) * uPixelRatio * (5.8 / -mvPosition.z);
}
`;

const fragmentShader = `
varying float vIntensity;
varying float vDepth;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float circle = 1.0 - smoothstep(0.18, 0.5, length(uv));
  vec3 deepBlue = vec3(0.018, 0.045, 0.19);
  vec3 electric = vec3(0.2, 0.48, 1.0);
  vec3 whiteBlue = vec3(0.75, 0.93, 1.0);
  vec3 color = mix(deepBlue, electric, vDepth);
  color = mix(color, whiteBlue, smoothstep(0.42, 1.0, vIntensity));

  float alpha = circle * (0.14 + vIntensity * 0.86) * vDepth;
  gl_FragColor = vec4(color, alpha);
}
`;

function TerrainPoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointerTargetRef = useRef(new THREE.Vector2());
  const { pointer, viewport, gl } = useThree();

  const positions = useMemo(() => {
    const columns = 236;
    const rows = 132;
    const width = 13.5;
    const depth = 8.2;
    const data = new Float32Array(columns * rows * 3);
    let index = 0;

    for (let z = 0; z < rows; z += 1) {
      for (let x = 0; x < columns; x += 1) {
        const xRatio = x / (columns - 1);
        const zRatio = z / (rows - 1);
        data[index] = (xRatio - 0.5) * width;
        data[index + 1] = 0;
        data[index + 2] = (zRatio - 0.5) * depth;
        index += 3;
      }
    }

    return data;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uPixelRatio: { value: 1 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useEffect(() => {
    const intro = materialRef.current?.uniforms.uIntro;
    if (!intro) return;

    gsap.to(intro, {
      value: 1,
      duration: 2.4,
      ease: "power3.out",
    });
  }, []);

  useFrame((state) => {
    const uniforms = materialRef.current?.uniforms;
    if (!uniforms) return;

    pointerTargetRef.current.set(pointer.x * viewport.width * 0.12, pointer.y * viewport.height * 0.12);
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2);
    uniforms.uPointer.value.lerp(pointerTargetRef.current, 0.06);

    if (pointsRef.current) {
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, pointer.x * 0.025, 0.035);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -0.42 + pointer.y * 0.025, 0.035);
    }
  });

  return (
    <points ref={pointsRef} position={[0, -2.5, 0.3]} rotation={[-0.42, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function FlowingParticleTerrain() {
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasWrapRef.current) return;

    gsap.fromTo(
      canvasWrapRef.current,
      { opacity: 0, filter: "blur(18px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={canvasWrapRef} className="flowing-particle-terrain" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.05, 6.6], fov: 47, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <TerrainPoints />
      </Canvas>
    </div>
  );
}
