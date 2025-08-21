import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);


let center = new THREE.Vector3(0, 0, 0)

let layout = []

async function getGraph() {
    try {
        const response = await fetch('/get-graph', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        layout = data.layout
        console.log(layout)

    } catch (error) {
        console.error('Error getting graph:', error);
    }
}

function generatePoints() {
    const geometry = new THREE.SphereGeometry(1);
    const material = new THREE.MeshNormalMaterial();

    const nodeGroup = new THREE.Group()
    let i = 0;
    while (i < layout.length) {
        let node = new THREE.Mesh(geometry, material)

        node.position.set(layout[i][0], layout[i][1], 0)
        nodeGroup.add(node)

        i += 1
    }
    scene.add(nodeGroup)

    let box = new THREE.Box3().setFromObject(nodeGroup);

    center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
}

await getGraph()

generatePoints()

camera.position.set(center.x, center.y, 80)

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
