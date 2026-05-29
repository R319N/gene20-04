"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform float uReveal;
uniform float uPixelRatio;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vGlow;
varying vec3 vColor;

void main() {
  vec3 p = position;
  float waveA = sin(p.x * 2.25 + uTime * 0.9);
  float waveB = cos(p.y * 2.85 - uTime * 0.72);
  float waveC = sin((p.x + p.y + p.z) * 1.65 + uTime * 1.18);
  float ripple = waveA * 0.34 + waveB * 0.24 + waveC * 0.18;

  vec3 normalDirection = normalize(p + vec3(0.001));
  p += normalDirection * ripple;
  p *= mix(0.72, 1.0, uReveal);

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float verticalSweep = smoothstep(-1.3, 1.35, p.y + sin(uTime * 0.35) * 0.35);
  float ridge = smoothstep(0.18, 0.96, abs(ripple));
  vGlow = max(ridge, verticalSweep * 0.72);
  vColor = mix(uColorA, uColorB, verticalSweep);

  gl_PointSize = (1.45 + vGlow * 2.55) * uPixelRatio * (6.2 / -mvPosition.z);
}
`;

const fragmentShader = `
varying float vGlow;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dot = 1.0 - smoothstep(0.18, 0.5, length(uv));
  float alpha = dot * (0.18 + vGlow * 0.66);
  gl_FragColor = vec4(vColor, alpha);
}
`;

type EnergyMeshProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  reverse?: boolean;
};

function EnergyMesh({ position, rotation, scale, reverse = false }: EnergyMeshProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const positions = useMemo(() => {
    const widthSegments = 300;
    const heightSegments = 82;
    const width = 4.4;
    const height = 8.85;
    const data = new Float32Array(widthSegments * heightSegments * 3);
    let index = 0;

    for (let y = 0; y < heightSegments; y += 1) {
      for (let x = 0; x < widthSegments; x += 1) {
        const u = x / (widthSegments - 1);
        const v = y / (heightSegments - 1);
        const px = (u - 0.5) * width;
        const py = (v - 0.5) * height;
        const falloff = Math.sin(u * Math.PI) * Math.sin(v * Math.PI);
        const pz = Math.sin(u * Math.PI * 2.1) * 0.28 + Math.cos(v * Math.PI * 1.75) * 0.18;

        data[index] = px;
        data[index + 1] = py;
        data[index + 2] = pz * falloff;
        index += 3;
      }
    }

    return data;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uPixelRatio: { value: 1 },
      uColorA: { value: new THREE.Color("#04d8ff") },
      uColorB: { value: new THREE.Color("#8b31ff") },
    }),
    []
  );

  useEffect(() => {
    if (!materialRef.current || !pointsRef.current) return;

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.to(materialRef.current.uniforms.uReveal, { value: 1, duration: 1.8 });
    timeline.fromTo(
      pointsRef.current.scale,
      { x: scale * 0.72, y: scale * 0.72, z: scale * 0.72 },
      { x: scale, y: scale, z: scale, duration: 1.8 },
      0
    );

    return () => {
      timeline.kill();
    };
  }, [scale]);

  useFrame((state) => {
    if (!materialRef.current || !pointsRef.current) return;

    const direction = reverse ? -1 : 1;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * direction;
    materialRef.current.uniforms.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
    pointsRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.28) * 0.07 * direction;
    pointsRef.current.rotation.y = rotation[1] + Math.cos(state.clock.elapsedTime * 0.32) * 0.12 * direction;
  });

  return (
    <points ref={pointsRef} position={position} rotation={rotation} scale={scale}>
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

export default function ContactEnergyField() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, filter: "blur(14px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={wrapRef} className="contact-energy-field" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <EnergyMesh position={[3.55, 1.55, 0]} rotation={[0.24, -0.62, -0.18]} scale={1.15} />
        <EnergyMesh position={[-4.25, -2.45, -0.5]} rotation={[-0.35, 0.72, 0.34]} scale={0.82} reverse />
      </Canvas>
    </div>
  );
}
