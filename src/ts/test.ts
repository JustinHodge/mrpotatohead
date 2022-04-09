import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

init();

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
    );
    camera.position.z = 10;
    camera.position.y = -4;
    camera.position.x = 1;

    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    const taterTexture = new THREE.TextureLoader().load(
        "./assets/textures/tater_h.png"
    );
    const taterSkin = new THREE.MeshStandardMaterial({
        map: taterTexture,
        flatShading: true,
        color: 0xc9a183,
    });
    const loader = new OBJLoader();
    loader.load("./assets/models/10201_Potato_v1-L3.obj", function (obj) {
        obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = taterSkin;
            }
        });

        scene.add(obj);
    });

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    document.body.appendChild(renderer.domElement);
    document.onkeydown = arrowControls;

    function animation(time: any) {
        renderer.render(scene, camera);
    }

    function arrowControls(event: KeyboardEvent) {
        const deltaPerInput = 0.5;
        console.log(event);

        if (event.key == "F12") {
            return;
        }

        event.preventDefault();

        if (event.key == "ArrowLeft") {
            camera.position.x -= deltaPerInput;
            controls.target.addVectors(
                controls.target,
                new THREE.Vector3(-deltaPerInput, 0, 0)
            );
        }

        if (event.key == "ArrowRight") {
            camera.position.x += deltaPerInput;
            controls.target.addVectors(
                controls.target,
                new THREE.Vector3(-deltaPerInput, 0, 0)
            );
        }
        if (event.key == "ArrowDown") {
            camera.position.y -= deltaPerInput;
            controls.target.addVectors(
                controls.target,
                new THREE.Vector3(0, -deltaPerInput, 0)
            );
        }

        if (event.key == "ArrowUp") {
            camera.position.y += deltaPerInput;
            controls.target.addVectors(
                controls.target,
                new THREE.Vector3(0, deltaPerInput, 0)
            );
        }

        if (event.key == "+") {
            camera.position.z -= deltaPerInput;
            controls.target.addVectors(
                controls.target,
                new THREE.Vector3(0, 0, -deltaPerInput)
            );
        }

        if (event.key == "-") {
            camera.position.z += deltaPerInput;
            controls.target.addVectors(
                controls.target,
                new THREE.Vector3(0, deltaPerInput, 0)
            );
        }

        console.log(camera.position);
    }
}
