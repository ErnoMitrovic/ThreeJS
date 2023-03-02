import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true;

camera.position.set(0,2,5);
orbit.update();


const helperAxes = new THREE.AxesHelper(5);

const scene = new THREE.Scene();
scene.add(helperAxes);

const texture = new THREE.TextureLoader().load('/src/Naike_Identity.png', (txt) => texture = txt, (xhr) => {
    const p = document.createElement('p');
    const txt = document.createTextNode( xhr.loaded / xhr.total * 100 ) + '% loaded';
    p.appendChild(txt);
    document.body.appendChild(p);
}, (error) => {
    const p = document.createElement('p');
    const txt = document.createTextNode("Error: " + error.message);
    p.appendChild(txt);
    document.body.appendChild(p);
} );
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({map: texture, color: 0x00ffff});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

function animate(time){
    box.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);