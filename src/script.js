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

camera.position.set(0,20,50);
orbit.update();

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0x333333, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set(1,1,2);
camera.add(pointLight);
scene.add(camera);

const texture = new THREE.TextureLoader().load(new URL('./public/NaikeIdent.png', import.meta.url));
const woodTexture = new THREE.TextureLoader().load(new URL('./wood_texture.jpg', import.meta.url))
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({map: woodTexture, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = 0.5 * Math.PI;
scene.add(plane);

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