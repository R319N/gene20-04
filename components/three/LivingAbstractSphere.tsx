"use client";

import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform float uIntro;
uniform vec2 uPointer;
varying vec2 vUv;
varying float vLift;

void main() {
  vUv = uv;

  vec3 p = position;
  vec2 centered = uv - 0.5;
  float radius = length(centered);
  float mask = smoothstep(0.64, 0.18, radius);

  float rowWave = sin(uv.y * 28.0 + uTime * 1.45);
  float columnWave = cos(uv.x * 24.0 - uTime * 1.05);
  float broadBreath = sin(uTime * 0.82 + radius * 8.0);
  float pointerRipple = sin(distance(centered, uPointer * 0.34) * 30.0 - uTime * 4.0);
  float lift = (rowWave * 0.045 + columnWave * 0.035 + broadBreath * 0.06 + pointerRipple * 0.028) * mask;

  p.xy += centered * (sin(uTime * 0.72) * 0.018 + lift * 0.035) * mask;
  p.z += lift;
  p *= mix(0.72, 1.0, uIntro);

  vLift = lift;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;
varying float vLift;

void main() {
  vec2 center = vUv - 0.5;
  float radius = length(center);
  float chroma = 0.0028 + abs(vLift) * 0.012;

  vec4 base = texture2D(uTexture, vUv);
  vec4 cyanSample = texture2D(uTexture, vUv + vec2(chroma, -chroma * 0.45));
  vec4 magentaSample = texture2D(uTexture, vUv - vec2(chroma * 0.8, chroma * 0.55));

  vec3 color = vec3(cyanSample.r * 0.35 + base.r * 0.65, base.g, magentaSample.b * 0.42 + base.b * 0.58);
  float brightness = max(max(base.r, base.g), base.b);
  float alpha = base.a;

  float topSweep = smoothstep(0.42, 0.96, sin(vUv.y * 18.0 + vUv.x * 7.0 - uTime * 1.75) * 0.5 + 0.5);
  float edgeGlow = smoothstep(0.22, 0.68, radius) * smoothstep(0.08, 0.56, brightness);
  float electricPulse = smoothstep(0.34, 0.92, brightness) * (0.78 + sin(uTime * 2.2 + vUv.y * 16.0) * 0.22);

  color += vec3(0.0, 0.42, 0.85) * edgeGlow * 0.18;
  color += vec3(0.0, 0.92, 1.0) * topSweep * electricPulse * 0.16;
  color += vec3(0.78, 0.0, 0.52) * smoothstep(0.18, 0.0, vUv.y) * brightness * 0.22;

  float livingAlpha = alpha * (0.86 + electricPulse * 0.18 + abs(vLift) * 1.8);
  if (livingAlpha < 0.01) discard;

  gl_FragColor = vec4(color, livingAlpha);
}
`;

function AnimatedSphereImage() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointerTargetRef = useRef(new THREE.Vector2());
  const texture = useTexture("/images/abstract-sphere.png");
  const { pointer, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [texture]
  );

  const imageAspect = 458 / 458;
  const height = Math.min(viewport.height * 1.18, viewport.width * 1.18 / imageAspect);
  const width = height * imageAspect;

  useEffect(() => {
    const intro = materialRef.current?.uniforms.uIntro;
    if (!intro || !meshRef.current) return;

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.to(intro, { value: 1, duration: 1.35 });
    timeline.fromTo(meshRef.current.rotation, { x: -0.08, y: -0.18, z: -0.035 }, { x: -0.03, y: 0.07, z: 0, duration: 1.7 }, 0);

    return () => {
      timeline.kill();
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    pointerTargetRef.current.set(pointer.x, pointer.y);
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uPointer.value.lerp(pointerTargetRef.current, 0.045);

    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.08, 0.035);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -0.035 - pointer.y * 0.055, 0.035);
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.012;
  });

  return (
    <mesh ref={meshRef} scale={[width, height, 1]}>
      <planeGeometry args={[1, 1, 220, 200]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function LivingAbstractSphere() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, filter: "blur(10px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={wrapRef} className="living-abstract-sphere" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <AnimatedSphereImage />
      </Canvas>
    </div>
  );
}
