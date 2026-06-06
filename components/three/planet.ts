import gsap from "gsap";
import * as THREE from "three";

import earthVertex from "./shaders/earth/vertex.glsl";
import earthFragment from "./shaders/earth/fragment.glsl";
import atmosphereVertex from "./shaders/atmosphere/vertex.glsl";
import atmosphereFragment from "./shaders/atmosphere/fragment.glsl"
import getStarfield from './getStarField'
import getLayer from "./getLayer";


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
    renderer.setPixelRatio(size.pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // texture loader
    const Tl = new THREE.TextureLoader();
    const dayTexture = Tl.load("/textures/earth_daymap.jpg");
    const nightTexture = Tl.load("/textures/earth_nightmap.jpg");
    const specularCloudsTexture = Tl.load("/textures/specularClouds.jpg");
    const glowTexture = Tl.load("/textures/rad-grad.png");

    dayTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;

    const baseAnisotropy = renderer.capabilities.getMaxAnisotropy();

    dayTexture.anisotropy = baseAnisotropy;
    specularCloudsTexture.anisotropy = baseAnisotropy;
    nightTexture.anisotropy = baseAnisotropy;

    // geometry
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64);

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
    const earthGroup = new THREE.Group();
    earthGroup.add(earth, atmosphere, nebula, stars);
    // + planetGlow,networkGlobe
    //     const networkGlobe = createNetworkGlobe();
    //     const planetGlow = createPlanetGlow(glowTexture);

    earthGroup.rotation.z = -23.4 * Math.PI / 180;



    const sunDirection = new THREE.Vector3();
    sunDirection.set(-0.85, 0.18, -1).normalize();

    earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);

    scene.add(earthGroup);
    //stars


    const updatePlanetPosition = () => {
        earthGroup.position.x = window.innerWidth >= 1024 ? 2.2 : 0;
    };

    updatePlanetPosition();

    // animation loop
    gsap.ticker.add((time) => {
        earth.rotation.y = time * 0.2;
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
        renderer.setPixelRatio(size.pixelRatio);
        updatePlanetPosition();
    });

    return { scene, renderer };
}
export default initPlanet;
