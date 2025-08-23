import * as THREE from 'three';

let center = new THREE.Vector3(0, 0, 0)
let layout = []
let graph = []

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
    console.log("edges", edges)

    //draw the edges 
    //try to print just one edge
    console.log("edge 1", edges[0])
    console.log("edge 1 point 1", edges[0][0])
    console.log("edge 1 point 2", edges[0][1])

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
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

await getGraph()
generatePoints()
generateLines()

//set camera based on location of the node object group
camera.position.set(center.x, center.y, center.x + 60)

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
