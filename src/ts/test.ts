import * as THREE from 'three';
import { PointLightShadow } from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'

let camera: any, scene : any, renderer: any;
let geometry, material, mesh: any;

init();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();
    const loader = new OBJLoader();
    loader.load(
        "./assets/10201_Potato_v1-L3.obj",
        function (obj) {
            scene.add(obj);
                renderer = new THREE.WebGLRenderer( { antialias: true } );
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setAnimationLoop( animation );
                document.body.appendChild( renderer.domElement );
        }
    )

    // mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );

    // renderer = new THREE.WebGLRenderer( { antialias: true } );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.setAnimationLoop( animation );
    // document.body.appendChild( renderer.domElement );

}

function animation( time: any ) {

    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    // .rotation.x = time / 2000;

    renderer.render( scene, camera );

}
