import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//honestly don't know what these are doing here
let center = new THREE.Vector3(0, 0, 0)
let controls
let layout = []
let graph = []

// -------------------- Elements --------------------------
const submitButton = document.getElementById('submit')
const container = document.getElementById('threejs-container')

// -------------- Scene Setup ---------------------------
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
camera.position.set(center.x, center.y, center.z + 70)
controls = new OrbitControls(camera, renderer.domElement);

// ----------------- Event Listeners ----------------------
submitButton.addEventListener("click", () => { initializeScene() })

async function getGraph(numberOfNodes, clusteringModifier, nullEdgeProbability) {
    console.log("number of nodes", numberOfNodes)
    try {
        const requestData = {
            number_of_nodes: parseInt(numberOfNodes),
            clustering_modifier: parseInt(clusteringModifier),
            null_edge_probability: parseInt(nullEdgeProbability)
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


// ---------- Scene generation -----------------

function generatePoints(threeD) {
    const geometry = new THREE.SphereGeometry(1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const nodeGroup = new THREE.Group()
    let i = 0;
    while (i < layout.length) {
        let node = new THREE.Mesh(geometry, material)
        if (threeD) {
            node.position.set(layout[i][0], layout[i][1], layout[i][2])
        }
        else {
            node.position.set(layout[i][0], layout[i][1], 0)
        }
        nodeGroup.add(node)

        i += 1
    }
    scene.add(nodeGroup)

    let box = new THREE.Box3().setFromObject(nodeGroup);

    center = box.getCenter(new THREE.Vector3());
}


function generateEdges() {
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
    return edges
}

function addEdgesToScene(edges, threeD) {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const lineGroup = new THREE.Group()

    let k = 0;
    while (k < edges.length) {
        //convert each edge into a threejs vector, starting with 2D
        let points = []
        if (threeD) {
            points.push(new THREE.Vector3(edges[k][0][0], edges[k][0][1], edges[k][0][2]))
            points.push(new THREE.Vector3(edges[k][1][0], edges[k][1][1], edges[k][1][2]))
        }
        else {
            points.push(new THREE.Vector2(edges[k][0][0], edges[k][0][1]))
            points.push(new THREE.Vector2(edges[k][1][0], edges[k][1][1]))
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const edge = new THREE.Line(geometry, lineMaterial)
        lineGroup.add(edge)
        k += 1
    }

    scene.add(lineGroup)
}

async function initializeScene() {
    //Clean up any previous initializated geometries and materials 
    scene.children.forEach(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
    });

    //clear everything from scene
    scene.clear()

    let numberOfNodes = document.getElementById("node-number").value
    let clusteringModidifier = document.getElementById("clustering-modifier").value
    let nullEdgeProbability = document.getElementById("null-edge-probability").value
    let threeD = document.getElementById("three-d").checked

    await getGraph(numberOfNodes, clusteringModidifier, nullEdgeProbability)

    //Create the elements
    generatePoints(threeD)
    let edges = generateEdges()
    addEdgesToScene(edges, threeD)

}


function animate() {
    renderer.render(scene, camera);
    controls.update();
}

initializeScene()
renderer.setAnimationLoop(animate);
