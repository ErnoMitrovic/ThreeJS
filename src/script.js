import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);
const imgName = 'NaikeIdent';

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true;

camera.position.set(0,2,5);
orbit.update();

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0x333333, 0.4);
scene.add(light);

const point = new THREE.PointLight( 0xffffff, 0.8);
point.position.set( 50, 50, 50 );
scene.add( point );

const texture = new THREE.TextureLoader().load(new URL('./public/NaikeIdent.png', import.meta.url));
/*const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({map: texture});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);*/

new OBJLoader().load(
    new URL('./public/shoe.obj', import.meta.url),
    obj => {
        obj.traverse(child => {
            if(child.isMesh) child.material.map = texture;
        })
        scene.add(obj);
        console.log( 'Success');
    },
    xhr => {
        console.log(' OBJ ' +  Math.round(xhr.loaded / xhr.total * 100)  + '% loaded');
    },
    error => {
        console.log("Error: " + error.message);
    }
);

function animate(){
    renderer.render(scene, camera);   
}

renderer.setAnimationLoop(animate);