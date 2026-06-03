import gsap from "gsap";
import * as THREE from "three";
import VertexShader from './shaders/earth/vertex.glsl';
import FragmentShader from './shaders/earth/fragment.glsl';
import getStarfield from './getStarField'

const initPlanet = (): { scene: THREE.Scene; } => {
    //target
    const canvas = document.querySelector("canvas.planet-3D") as HTMLCanvasElement;

    //scene setup
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
    camera.position.z = 30;
    scene.add(camera);


    //renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(size.pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    //texture loader
    const Tl = new THREE.TextureLoader();
    const dayTexture = Tl.load("/textures/earth_daymap.jpg");
    const nightTexture = Tl.load("/textures/earth_nightmap.jpg");
    const specularCloudsTexture = Tl.load("/textures/specularClouds.jpg");

    dayTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;

    const anisotropy = renderer.capabilities.getMaxAnisotropy();
    dayTexture.anisotropy = anisotropy;
    nightTexture.anisotropy = anisotropy;
    specularCloudsTexture.anisotropy = anisotropy;
    const atmosphereDayColor = "#4a96e8";
    const atmosphereTwilightColor = "#1950E5";
    //geometry
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);

    const earthMaterial = new THREE.ShaderMaterial({
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
        transparent: true,
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
    })

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    scene.add(earth);
    const stars = getStarfield({ numStars: 2000 });
    scene.add(stars);

    const updatePlanetPosition = () => {
        earth.position.x = window.innerWidth >= 1024 ? 2.2 : 0;
    };

    updatePlanetPosition();

    //animation loop
    gsap.ticker.add((time) => {
        earth.rotation.y = time * .2;
        renderer.render(scene, camera);
    });

    gsap.ticker.lagSmoothing(0)

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
    return { scene };
}
export default initPlanet;
