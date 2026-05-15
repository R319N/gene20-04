'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Globe sphere (transparent with wireframe)
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a4d7a,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Grid lines (latitude/longitude)
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x2a5f8f,
      transparent: true,
      opacity: 0.3,
    });

    // Latitude lines
    for (let i = 0; i < 10; i++) {
      const lat = (Math.PI / 10) * i - Math.PI / 2;
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
      globe.add(line);
    }

    // Longitude lines
    for (let i = 0; i < 16; i++) {
      const points = [];
      const theta = (i / 16) * Math.PI * 2;
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
      globe.add(line);
    }

    // Continent particles (golden/copper dots)
    const continentPoints = generateContinentPoints();
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(continentPoints, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4a574,
      size: 0.015,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Glowing connection points
    const connectionPoints = [
      { lat: 51.5074, lon: -0.1278 }, // London
      { lat: 40.7128, lon: -74.006 }, // New York
      { lat: 35.6762, lon: 139.6503 }, // Tokyo
      { lat: -33.8688, lon: 151.2093 }, // Sydney
      { lat: 1.3521, lon: 103.8198 }, // Singapore
      { lat: 37.7749, lon: -122.4194 }, // San Francisco
      { lat: -23.5505, lon: -46.6333 }, // São Paulo
      { lat: 55.7558, lon: 37.6173 }, // Moscow
    ];

    connectionPoints.forEach((point) => {
      const pos = latLonToVector3(point.lat, point.lon, 1.02);
      const glowGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4dd9ff,
        transparent: true,
        opacity: 0.9,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(pos);
      scene.add(glow);

      // Add point light for glow effect
      const pointLight = new THREE.PointLight(0x4dd9ff, 0.5, 0.3);
      pointLight.position.copy(pos);
      scene.add(pointLight);
    });

    // Connection lines (arcs between points)
    for (let i = 0; i < connectionPoints.length - 1; i++) {
      const start = latLonToVector3(
        connectionPoints[i].lat,
        connectionPoints[i].lon,
        1.02
      );
      const end = latLonToVector3(
        connectionPoints[i + 1].lat,
        connectionPoints[i + 1].lon,
        1.02
      );

      const arcPoints = [];
      for (let j = 0; j <= 20; j++) {
        const t = j / 20;
        const point = new THREE.Vector3().lerpVectors(start, end, t);
        point.normalize().multiplyScalar(1.02 + Math.sin(t * Math.PI) * 0.1);
        arcPoints.push(point);
      }

      const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMaterial = new THREE.LineBasicMaterial({
        color: 0x4dd9ff,
        transparent: true,
        opacity: 0.4,
        linewidth: 2,
      });
      const arc = new THREE.Line(arcGeometry, arcMaterial);
      scene.add(arc);
    }

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate globe slowly
      globe.rotation.y += 0.002;
      particles.rotation.y += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}

// Helper function to convert lat/lon to 3D position
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

// Generate points for actual continent shapes
function generateContinentPoints(): number[] {
  const points: number[] = [];

  // Detailed continent polygons (simplified coordinates)
  const continentData = [
    // North America
    { name: 'North America', coords: [
      [71, -156], [70, -141], [69, -133], [64, -135], [60, -139], [58, -137],
      [54, -130], [52, -128], [51, -127], [49, -123], [48, -123], [45, -124],
      [42, -124], [40, -124], [38, -123], [35, -120], [32, -117], [29, -114],
      [26, -109], [25, -99], [26, -97], [29, -95], [30, -90], [29, -88],
      [25, -80], [21, -87], [19, -88], [18, -94], [16, -92], [14, -91],
      [9, -79], [10, -75], [11, -72], [19, -71], [22, -78], [24, -82],
      [28, -82], [31, -81], [33, -79], [36, -76], [39, -75], [41, -71],
      [43, -69], [45, -67], [47, -65], [49, -64], [51, -57], [53, -56],
      [55, -60], [58, -63], [60, -65], [62, -64], [64, -62], [66, -64],
      [68, -66], [69, -70], [70, -75], [71, -80], [72, -90], [72, -100],
      [71, -110], [70, -120], [71, -130], [71, -140], [71, -156]
    ]},
    // South America
    { name: 'South America', coords: [
      [12, -71], [10, -73], [8, -78], [4, -77], [1, -78], [-2, -79],
      [-4, -81], [-8, -78], [-12, -77], [-16, -71], [-18, -70], [-20, -70],
      [-23, -70], [-27, -70], [-30, -71], [-33, -71], [-36, -73], [-38, -73],
      [-41, -73], [-44, -73], [-47, -74], [-50, -73], [-52, -70], [-54, -68],
      [-55, -67], [-54, -65], [-52, -69], [-48, -65], [-44, -65], [-40, -62],
      [-36, -57], [-34, -56], [-32, -52], [-29, -51], [-26, -48], [-23, -47],
      [-20, -48], [-18, -50], [-16, -52], [-13, -54], [-10, -58], [-6, -61],
      [-3, -64], [0, -67], [2, -68], [5, -69], [8, -70], [11, -70], [12, -71]
    ]},
    // Europe
    { name: 'Europe', coords: [
      [71, 25], [70, 28], [69, 33], [68, 40], [66, 43], [64, 45],
      [62, 50], [60, 56], [59, 60], [60, 65], [62, 69], [64, 74],
      [66, 78], [68, 82], [69, 88], [70, 92], [69, 95], [68, 98],
      [66, 100], [64, 98], [62, 95], [60, 92], [58, 88], [56, 84],
      [54, 82], [52, 78], [50, 75], [48, 71], [46, 68], [44, 64],
      [42, 60], [40, 55], [38, 50], [36, 40], [37, 35], [38, 28],
      [40, 23], [42, 18], [44, 13], [46, 10], [48, 8], [50, 6],
      [52, 4], [54, 3], [56, 2], [58, 0], [60, -2], [62, -4],
      [64, -3], [66, 0], [68, 3], [69, 8], [70, 13], [71, 18], [71, 25]
    ]},
    // Africa
    { name: 'Africa', coords: [
      [37, 10], [35, 15], [32, 20], [30, 25], [27, 30], [23, 32],
      [18, 35], [15, 38], [12, 40], [10, 43], [8, 48], [5, 50],
      [2, 51], [0, 50], [-3, 48], [-6, 45], [-10, 43], [-13, 40],
      [-16, 38], [-19, 35], [-22, 33], [-25, 30], [-28, 28], [-30, 25],
      [-33, 22], [-34, 18], [-34, 15], [-33, 12], [-31, 10], [-28, 13],
      [-25, 16], [-22, 18], [-18, 22], [-15, 25], [-11, 28], [-7, 30],
      [-4, 32], [-1, 35], [2, 38], [5, 40], [8, 43], [11, 45],
      [14, 48], [17, 50], [20, 51], [23, 50], [26, 48], [29, 45],
      [31, 42], [33, 38], [35, 33], [36, 27], [37, 20], [37, 10]
    ]},
    // Asia
    { name: 'Asia', coords: [
      [77, 100], [75, 110], [73, 120], [70, 130], [68, 140], [65, 145],
      [62, 150], [60, 155], [57, 158], [55, 160], [52, 162], [50, 165],
      [48, 168], [45, 170], [42, 172], [40, 173], [37, 172], [35, 170],
      [32, 168], [30, 165], [27, 162], [25, 158], [22, 155], [20, 150],
      [18, 145], [15, 140], [12, 135], [10, 130], [8, 125], [7, 120],
      [6, 115], [5, 110], [5, 105], [6, 100], [8, 95], [10, 90],
      [13, 85], [16, 80], [20, 75], [25, 70], [30, 68], [35, 67],
      [40, 68], [45, 70], [50, 73], [55, 76], [60, 80], [64, 84],
      [68, 88], [71, 92], [73, 96], [75, 98], [77, 100]
    ]},
    // Australia
    { name: 'Australia', coords: [
      [-10, 142], [-11, 145], [-13, 148], [-16, 149], [-19, 149], [-22, 150],
      [-25, 152], [-28, 153], [-31, 152], [-33, 151], [-35, 149], [-37, 146],
      [-38, 143], [-38, 140], [-37, 137], [-35, 135], [-33, 133], [-31, 132],
      [-28, 131], [-26, 129], [-24, 128], [-22, 127], [-20, 126], [-18, 125],
      [-16, 124], [-14, 123], [-12, 123], [-11, 125], [-10, 128], [-10, 131],
      [-11, 134], [-11, 137], [-10, 140], [-10, 142]
    ]}
  ];

  // Generate dense points along continent boundaries and fill interiors
  continentData.forEach((continent) => {
    const coords = continent.coords;

    // Find bounds
    const lats = coords.map(c => c[0]);
    const lons = coords.map(c => c[1]);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    // Fill with points (grid sampling with point-in-polygon test)
    const density = 0.5; // degrees between points
    for (let lat = minLat; lat <= maxLat; lat += density) {
      for (let lon = minLon; lon <= maxLon; lon += density) {
        if (isPointInPolygon(lat, lon, coords)) {
          // Add some randomness for organic look
          const jitterLat = lat + (Math.random() - 0.5) * 0.3;
          const jitterLon = lon + (Math.random() - 0.5) * 0.3;
          const pos = latLonToVector3(jitterLat, jitterLon, 1.01);
          points.push(pos.x, pos.y, pos.z);
        }
      }
    }
  });

  return points;
}

// Point-in-polygon test (ray casting algorithm)
function isPointInPolygon(lat: number, lon: number, polygon: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][1], yi = polygon[i][0];
    const xj = polygon[j][1], yj = polygon[j][0];

    const intersect = ((yi > lat) !== (yj > lat))
        && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}
