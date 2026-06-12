'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import earthDay from '@/public/textures/earth-day.jpg';
import earthNight from '@/public/textures/earth_nightmap.jpg';
import getStarfield from './three/getStarField';
import { getFresnelMat } from './three/getFresnelMat';
import getLayer from './three/getLayer';

export default function Glove3d() {
  //camera setup

    const size = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio
    }

    const camera = new THREE.PerspectiveCamera(15, size.width / size.height, 0.1, 10000);
    camera.position.x = 0;
    camera.position.y = 0.1;
    camera.position.z = 15;
    scene.add(camera);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const PLANET_RADIUS = 2;
  const getViewportSettings = () => {
    const width = window.innerWidth;

    if (width < 480) {
      return {
        cameraZ: 8,
        cameraY: 0.05,
        groupScale: 0.72,
        groupX: 0,
        groupY: 0,
      };
    }

    if (width < 768) {
      return {
        cameraZ: 8,
        cameraY: 0.05,
        groupScale: 0.82,
        groupX: 0,
        groupY: 0,
      };
    }

    if (width < 1024) {
      return {
        cameraZ: 16,
        cameraY: 0.08,
        groupScale: 0.8,
        groupX: 0,
        groupY: 0,
      };
    }

    return {
      cameraZ: 5,
      cameraY: 0.1,
      groupScale: 0.8,
      groupX: 2.2,
      groupY: 0,
    };
  };
  


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.5,
      100
    );
    camera.position.set(0.2, 0, 3);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // const sunDirection = new THREE.Vector3(-2, 0.5, 1.5);
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    scene.add(earthGroup);

    const earthGeometry = new THREE.IcosahedronGeometry(1, 32);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(earthDay.src),
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earth);


    const lightMesh = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(earthNight.src),
      // blending: THREE.AdditiveBlending,
      // transparent: true,
      // opacity: 0.8,
    });
    const light = new THREE.Mesh(earthGeometry, lightMesh);
    earthGroup.add(light);


    const atmosphereMat = getFresnelMat();
    const glowMesh = new THREE.Mesh(earthGeometry, atmosphereMat);
    glowMesh.scale.setScalar(1.005);
    earthGroup.add(glowMesh);

    const wireGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x89b7ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const stars = getStarfield({ numStars: 2000 });
    scene.add(stars);
    // const sunLight = new THREE.DirectionalLight(0xffffff, 4.0);
    // sunLight.position.copy(sunDirection);
    // scene.add(sunLight);

    // const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
    // earthGroup.add(wireframe);
    const nebula = getLayer({ path: './textures/rad-grad.png' });
    scene.add(nebula);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    // directionalLight.position.set(4, 2, 5);
    // scene.add(directionalLight);

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;
    // controls.enablePan = false;
    // controls.minDistance = 1.8;
    // controls.maxDistance = 6;


    const updatePlanetLayout = () => {
      const viewport = getViewportSettings();

      camera.position.y = viewport.cameraY;
      camera.position.z = viewport.cameraZ;
      earthGroup.position.set(viewport.groupX, viewport.groupY, 0);
      earthGroup.scale.setScalar(viewport.groupScale);
      camera.updateProjectionMatrix();
    };

    updatePlanetLayout();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    let animationId = 0;

    const animate = (t = 0) => {
      animationId = window.requestAnimationFrame(animate);
      earthGroup.rotation.y += 0.004;
      stars.userData.update(t);
      controls.update();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      updatePlanetLayout();
    };

    handleResize();
    animate();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationId);

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }

      earthGeometry.dispose();
      earthMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}
