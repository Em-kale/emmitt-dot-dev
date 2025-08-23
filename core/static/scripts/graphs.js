import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let center = new THREE.Vector3(0, 0, 0)
let layout = []
let graph = []

async function getGraph() {
    try {
        const requestData = {
            number_of_nodes: 20
        }

        const response = await fetch('/get-graph', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        layout = data.layout
        graph = data.graph[0]
        console.log(layout)

    } catch (error) {
        console.error('Error getting graph:', error);
    }
}

function generatePoints() {
    const geometry = new THREE.SphereGeometry(1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

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
}

function generateLines() {
    let edges = []
    let i = 0;
    // calculate the points 
    while (i < layout.length) {
        let j = 0;
        while (j < layout.length) {
            if (graph[i, j] == 0) {
                j++
                continue
            }
            else {
                edges.push([layout[i], layout[j]])
            }
            j++
        }
        i++
    }

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const lineGroup = new THREE.Group()

    let k = 0;
    while (k < edges.length) {
        //convert each edge into a threejs vector, starting with 2D
        let points = []

        points.push(new THREE.Vector2(edges[k][0][0], edges[k][0][1]))
        points.push(new THREE.Vector2(edges[k][1][0], edges[k][1][1]))

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const edge = new THREE.Line(geometry, lineMaterial)
        lineGroup.add(edge)
        k += 1
    }
    scene.add(lineGroup)
}

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

const container = document.getElementById('threejs-container')
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.appendChild(renderer.domElement)
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
await getGraph()
generatePoints()
generateLines()

//set camera based on location of the node object group
camera.position.set(center.x, center.y, center.x + 70)
let controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    renderer.render(scene, camera);
    controls.update();
}

renderer.setAnimationLoop(animate);
