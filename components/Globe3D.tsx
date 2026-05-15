'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3.35;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Globe group (everything rotates together)
    const globeGroup = new THREE.Group();
    globeGroup.scale.setScalar(1.25);
    globeGroup.rotation.y = Math.PI * 0.95;
    scene.add(globeGroup);

    const earthTexture = createEarthTexture(renderer.capabilities.getMaxAnisotropy());

    const globeShellGeometry = new THREE.SphereGeometry(1, 96, 96);
    const globeShellMaterial = new THREE.MeshBasicMaterial({
      map: earthTexture,
      color: 0x06122d,
      transparent: true,
      opacity: 0.52,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const globeShell = new THREE.Mesh(globeShellGeometry, globeShellMaterial);
    globeGroup.add(globeShell);

    // Grid lines (latitude/longitude)
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x2f74ff,
      transparent: true,
      opacity: 0.16,
    });

    // Latitude lines
    for (let i = 0; i <= 12; i++) {
      const lat = (Math.PI / 12) * i - Math.PI / 2;
      const radius = Math.cos(lat);
      const y = Math.sin(lat);
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            radius * Math.cos(theta),
            y,
            radius * Math.sin(theta)
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, gridMaterial);
      globeGroup.add(line);
    }

    // Longitude lines
    for (let i = 0; i < 24; i++) {
      const points = [];
      const theta = (i / 24) * Math.PI * 2;
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI;
        points.push(
          new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta),
            Math.cos(phi),
            Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, gridMaterial);
      globeGroup.add(line);
    }

    // Land particles generated from a compact continent mask.
    let particles: THREE.Points | null = null;
    const particleGeometry = new THREE.BufferGeometry();

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6ca5ff,
      size: 0.009,
      transparent: true,
      opacity: 0.92,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const continentPoints = generateContinentParticles();
    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(continentPoints, 3)
    );
    particles = new THREE.Points(particleGeometry, particleMaterial);
    globeGroup.add(particles);

    // Connection points (glowing cyan/blue dots)
    const connectionPoints = [
      { lat: 40.7128, lon: -74.006, name: 'New York' },
      { lat: 51.5074, lon: -0.1278, name: 'London' },
      { lat: 35.6762, lon: 139.6503, name: 'Tokyo' },
      { lat: -33.8688, lon: 151.2093, name: 'Sydney' },
      { lat: 1.3521, lon: 103.8198, name: 'Singapore' },
      { lat: 37.7749, lon: -122.4194, name: 'San Francisco' },
      { lat: -23.5505, lon: -46.6333, name: 'São Paulo' },
      { lat: 55.7558, lon: 37.6173, name: 'Moscow' },
      { lat: 28.6139, lon: 77.209, name: 'Delhi' },
      { lat: 22.3193, lon: 114.1694, name: 'Hong Kong' },
    ];

    connectionPoints.forEach((point) => {
      const pos = latLonToVector3(point.lat, point.lon, 1.03);

      // Main glowing dot
      const dotGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: 0x4f8dff,
        transparent: true,
        opacity: 1,
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Outer glow
      const glowGeometry = new THREE.SphereGeometry(0.035, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4f8dff,
        transparent: true,
        opacity: 0.26,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(pos);
      globeGroup.add(glow);

      // Point light for extra glow
      const pointLight = new THREE.PointLight(0x4f8dff, 0.5, 0.4);
      pointLight.position.copy(pos);
      globeGroup.add(pointLight);
    });

    // Connection arcs (curved lines between cities)
    for (let i = 0; i < connectionPoints.length; i++) {
      const nextIndex = (i + 1) % connectionPoints.length;
      const start = latLonToVector3(
        connectionPoints[i].lat,
        connectionPoints[i].lon,
        1.03
      );
      const end = latLonToVector3(
        connectionPoints[nextIndex].lat,
        connectionPoints[nextIndex].lon,
        1.03
      );

      const arcPoints = [];
      for (let j = 0; j <= 40; j++) {
        const t = j / 40;
        const point = new THREE.Vector3().lerpVectors(start, end, t);
        // Arc height based on distance
        const arcHeight = start.distanceTo(end) * 0.15;
        point.normalize().multiplyScalar(1.03 + Math.sin(t * Math.PI) * arcHeight);
        arcPoints.push(point);
      }

      const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMaterial = new THREE.LineBasicMaterial({
        color: 0x3578ff,
        transparent: true,
        opacity: 0.24,
      });
      const arc = new THREE.Line(arcGeometry, arcMaterial);
      globeGroup.add(arc);
    }

    // Outer glow ring
    const ringGeometry = new THREE.RingGeometry(1.2, 1.25, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x4f8dff,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    globeGroup.add(ring);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x4f8dff, 0.7);
    mainLight.position.set(5, 3, 5);
    scene.add(mainLight);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0016;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      fitCameraToGlobe(camera, 1.38);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    handleResize();
    animate();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      globeShellGeometry.dispose();
      globeShellMaterial.dispose();
      earthTexture.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

function fitCameraToGlobe(camera: THREE.PerspectiveCamera, radius: number) {
  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
  const limitingFov = Math.min(verticalFov, horizontalFov);

  camera.position.z = radius / Math.sin(limitingFov / 2);
}

function createEarthTexture(anisotropy: number) {
  const canvas = document.createElement('canvas');
  const width = 1024;
  const height = 512;
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const image = context.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    const lat = 90 - (y / (height - 1)) * 180;
    const polarShade = Math.abs(lat) / 90;

    for (let x = 0; x < width; x++) {
      const lon = (x / (width - 1)) * 360 - 180;
      const index = (y * width + x) * 4;
      const land = getLandStrength(lat, lon);
      const oceanLine = Math.sin((lon + lat * 1.8) * 0.16) * 0.5 + 0.5;

      if (land > 0) {
        const glow = 54 + land * 68 + polarShade * 20;
        image.data[index] = 22;
        image.data[index + 1] = Math.round(62 + glow * 0.45);
        image.data[index + 2] = Math.round(126 + glow);
        image.data[index + 3] = 230;
      } else {
        image.data[index] = 2;
        image.data[index + 1] = Math.round(12 + oceanLine * 10);
        image.data[index + 2] = Math.round(35 + oceanLine * 18);
        image.data[index + 3] = 185;
      }
    }
  }

  context.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

function generateContinentParticles() {
  const points: number[] = [];
  const random = createSeededRandom(3719);

  for (let lat = -82; lat <= 84; lat += 1.15) {
    const densityForLatitude = Math.max(0.25, Math.cos(THREE.MathUtils.degToRad(lat)));

    for (let lon = -180; lon < 180; lon += 1.15) {
      const land = getLandStrength(lat, lon);
      if (land <= 0) continue;
      if (random() > 0.22 + land * 0.72 * densityForLatitude) continue;

      const jitterLat = lat + (random() - 0.5) * 0.7;
      const jitterLon = lon + (random() - 0.5) * 0.7;
      const pos = latLonToVector3(jitterLat, jitterLon, 1.014);
      points.push(pos.x, pos.y, pos.z);
    }
  }

  return points;
}

type LandMass = {
  lat: number;
  lon: number;
  width: number;
  height: number;
  rotation?: number;
};

const LAND_MASSES: LandMass[] = [
  { lat: 48, lon: -104, width: 62, height: 28, rotation: -18 },
  { lat: 33, lon: -84, width: 34, height: 18, rotation: -8 },
  { lat: 17, lon: -100, width: 18, height: 10, rotation: 16 },
  { lat: -15, lon: -60, width: 27, height: 42, rotation: -18 },
  { lat: 72, lon: -42, width: 24, height: 14, rotation: -15 },
  { lat: 52, lon: 15, width: 34, height: 13, rotation: 7 },
  { lat: 9, lon: 22, width: 34, height: 48, rotation: -8 },
  { lat: 25, lon: 44, width: 23, height: 19, rotation: 22 },
  { lat: 49, lon: 74, width: 76, height: 28, rotation: -5 },
  { lat: 24, lon: 78, width: 31, height: 27, rotation: -16 },
  { lat: 32, lon: 113, width: 33, height: 19, rotation: -10 },
  { lat: 6, lon: 116, width: 22, height: 14, rotation: 10 },
  { lat: -25, lon: 134, width: 31, height: 19, rotation: 6 },
  { lat: -42, lon: 172, width: 8, height: 10, rotation: -25 },
  { lat: -78, lon: 0, width: 360, height: 10 },
];

const LAND_CUTOUTS: LandMass[] = [
  { lat: 39, lon: -72, width: 17, height: 13, rotation: -10 },
  { lat: 58, lon: -88, width: 15, height: 10, rotation: 18 },
  { lat: 25, lon: -82, width: 10, height: 8, rotation: 25 },
  { lat: 0, lon: -80, width: 12, height: 20, rotation: 3 },
  { lat: 7, lon: -47, width: 12, height: 18, rotation: -18 },
  { lat: 20, lon: 12, width: 13, height: 18, rotation: -2 },
  { lat: -6, lon: 43, width: 11, height: 15, rotation: 25 },
  { lat: 44, lon: 67, width: 22, height: 12, rotation: -5 },
  { lat: 53, lon: 107, width: 17, height: 11, rotation: 12 },
  { lat: 13, lon: 99, width: 9, height: 15, rotation: -20 },
];

function getLandStrength(lat: number, lon: number) {
  const landStrength = LAND_MASSES.reduce(
    (strongest, landMass) => Math.max(strongest, ellipseStrength(lat, lon, landMass)),
    0
  );

  if (landStrength === 0) return 0;

  const cutoutStrength = LAND_CUTOUTS.reduce(
    (strongest, cutout) => Math.max(strongest, ellipseStrength(lat, lon, cutout)),
    0
  );

  return Math.max(0, landStrength - cutoutStrength * 0.9);
}

function ellipseStrength(lat: number, lon: number, landMass: LandMass) {
  const rotation = THREE.MathUtils.degToRad(landMass.rotation ?? 0);
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const deltaLon = shortestLongitudeDelta(lon, landMass.lon) * Math.cos(THREE.MathUtils.degToRad(lat));
  const deltaLat = lat - landMass.lat;
  const rotatedX = deltaLon * cos - deltaLat * sin;
  const rotatedY = deltaLon * sin + deltaLat * cos;
  const distance =
    (rotatedX * rotatedX) / ((landMass.width * 0.5) ** 2) +
    (rotatedY * rotatedY) / ((landMass.height * 0.5) ** 2);

  if (distance > 1) return 0;
  return 1 - Math.pow(distance, 0.72);
}

function shortestLongitudeDelta(lon: number, center: number) {
  return ((((lon - center) % 360) + 540) % 360) - 180;
}

function createSeededRandom(seed: number) {
  let state = seed;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
