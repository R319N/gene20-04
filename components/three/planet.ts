import gsap from "gsap";
import * as THREE from "three";

import earthVertex from "./shaders/earth/vertex.glsl";
import earthFragment from "./shaders/earth/fragment.glsl";
import atmosphereVertex from "./shaders/atmosphere/vertex.glsl";
import atmosphereFragment from "./shaders/atmosphere/fragment.glsl"
import getStarfield from './getStarField'
import getLayer from "./getLayer";

const PLANET_RADIUS = 2;

const getViewportSettings = () => {
    const width = window.innerWidth;

    if (width < 480) {
        return {
            cameraZ: 22,
            cameraY: 0.05,
            groupScale: 0.72,
            groupX: 0,
            groupY: 0,
        };
    }

    if (width < 768) {
        return {
            cameraZ: 20,
            cameraY: 0.05,
            groupScale: 0.82,
            groupX: 0,
            groupY: 0,
        };
    }

    if (width < 1024) {
        return {
            cameraZ: 18,
            cameraY: 0.08,
            groupScale: 0.92,
            groupX: 0,
            groupY: 0,
        };
    }

    return {
        cameraZ: 15,
        cameraY: 0.1,
        groupScale: 1,
        groupX: 2.2,
        groupY: 0,
    };
};

const createNetworkGlobe = () => {
    const group = new THREE.Group();
    const nodeCount = 84;
    const radius = PLANET_RADIUS * 1.27;
    const positions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
        const y = 1 - (i / (nodeCount - 1)) * 2;
        const ringRadius = Math.sqrt(1 - y * y);
        const theta = i * Math.PI * (3 - Math.sqrt(5));
        const point = new THREE.Vector3(
            Math.cos(theta) * ringRadius * radius,
            y * radius,
            Math.sin(theta) * ringRadius * radius,
        );

        positions.push(point);
    }

    const pointGeometry = new THREE.BufferGeometry().setFromPoints(positions);
    const pointMaterial = new THREE.PointsMaterial({
        color: 0x6de7ff,
        size: 0.035,
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const nodes = new THREE.Points(pointGeometry, pointMaterial);

    const linePositions: number[] = [];
    const maxDistance = radius * 0.56;

    for (let i = 0; i < positions.length; i++) {
        let connections = 0;

        for (let j = i + 1; j < positions.length; j++) {
            if (connections >= 3) break;

            if (positions[i].distanceTo(positions[j]) <= maxDistance) {
                linePositions.push(
                    positions[i].x,
                    positions[i].y,
                    positions[i].z,
                    positions[j].x,
                    positions[j].y,
                    positions[j].z,
                );
                connections++;
            }
        }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x7af2ff,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    const links = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(links, nodes);

    group.userData.update = (time: number) => {
        group.rotation.y = time * 0.08;
        group.rotation.x = Math.sin(time * 0.35) * 0.04;
        const pulse = 1 + Math.sin(time * 1.4) * 0.018;
        group.scale.setScalar(pulse);
    };

    return group;
};


const initPlanet = (): { scene: THREE.Scene, renderer: THREE.WebGLRenderer } => {
    const canvas = document.querySelector(
        "canvas.planet-3D",
    ) as HTMLCanvasElement;

    // scene
    const scene = new THREE.Scene();

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


    // renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(size.pixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // texture loader
    const Tl = new THREE.TextureLoader();
    const dayTexture = Tl.load("/textures/earth_daymap.jpg");
    const nightTexture = Tl.load("/textures/earth_nightmap.jpg");
    const specularCloudsTexture = Tl.load("/textures/specularClouds.jpg");

    dayTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;

    const baseAnisotropy = renderer.capabilities.getMaxAnisotropy();

    dayTexture.anisotropy = baseAnisotropy;
    specularCloudsTexture.anisotropy = baseAnisotropy;
    nightTexture.anisotropy = baseAnisotropy;

    // geometry
    const earthGeometry = new THREE.SphereGeometry(PLANET_RADIUS, 64, 64);
    const atmosphereGeometry = new THREE.SphereGeometry(PLANET_RADIUS, 64, 64);

    const atmosphereDayColor = "#4a96e8";
    const atmosphereTwilightColor = "#1950E5";

    //material
    const earthMaterial = new THREE.ShaderMaterial({
        vertexShader: earthVertex,
        fragmentShader: earthFragment,
        uniforms: {
            uDayTexture: new THREE.Uniform(dayTexture),
            uNightTexture: new THREE.Uniform(nightTexture),
            uSpecularCloudsTexture: new THREE.Uniform(specularCloudsTexture),
            uSunDirection: new THREE.Uniform(new THREE.Vector3(-1, 0, 0)),
            uAtmosphereDayColor: new THREE.Uniform(
                new THREE.Color(atmosphereDayColor),
            ),
            uAtmosphereTwilightColor: new THREE.Uniform(
                new THREE.Color(atmosphereTwilightColor),
            ),
        },
        transparent: true,
        toneMapped: false,
    });

    const atmosphereMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        uniforms: {
            uOpacity: { value: 1 },
            uSunDirection: new THREE.Uniform(new THREE.Vector3(-1, 0, 0)),
            uAtmosphereDayColor: new THREE.Uniform(
                new THREE.Color(atmosphereDayColor),
            ),
            uAtmosphereTwilightColor: new THREE.Uniform(
                new THREE.Color(atmosphereTwilightColor),
            ),
        },
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
    });


    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

    atmosphere.scale.set(1.08, 1.08, 1.08);


    const stars = getStarfield({ numStars: 5000 });
    const nebula = getLayer({ path: './textures/rad-grad.png' });
    const networkGlobe = createNetworkGlobe();
    const earthGroup = new THREE.Group();
    earthGroup.add(earth, atmosphere, networkGlobe, nebula, stars);
    earthGroup.rotation.z = -23.4 * Math.PI / 180;



    const sunDirection = new THREE.Vector3();
    sunDirection.set(-0.85, 0.18, -1).normalize();

    earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);

    scene.add(earthGroup);
    //stars


    const updatePlanetLayout = () => {
        const viewport = getViewportSettings();

        camera.position.y = viewport.cameraY;
        camera.position.z = viewport.cameraZ;
        earthGroup.position.set(viewport.groupX, viewport.groupY, 0);
        earthGroup.scale.setScalar(viewport.groupScale);
        camera.updateProjectionMatrix();
    };

    updatePlanetLayout();

    // animation loop
    gsap.ticker.add((time) => {
        earth.rotation.y = time * 0.2;
        atmosphere.rotation.y = time * 0.2;
        networkGlobe.userData.update(time);
        renderer.render(scene, camera);
        stars.userData.update(time);
    });

    gsap.ticker.lagSmoothing(0);

    //handle resizing
    window.addEventListener("resize", () => {
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        size.pixelRatio = window.devicePixelRatio;
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
        renderer.setSize(size.width, size.height);
        renderer.setPixelRatio(Math.min(size.pixelRatio, 2));
        updatePlanetLayout();
    });

    return { scene, renderer };
}
export default initPlanet;
