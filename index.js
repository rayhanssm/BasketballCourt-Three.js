import * as THREE from './three.js/build/three.module.js'
import {OrbitControls} from './three.js/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer, control

const createLoader = () => {
    const loader = new THREE.TextureLoader()

    return loader
}

const init = () => {
    scene = new THREE.Scene()

    const fov = 45
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 1000
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(-70, 50, -40)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)

    control = new OrbitControls(camera, renderer.domElement)
    document.body.appendChild(renderer.domElement)

    renderer.shadowMap.enabled = true
}

const createFloor = () => {
    const geo = new THREE.BoxGeometry(40, 40)

    const texture = createLoader().load('./assets/floor.jpg')
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: texture
    })

    const box1 = new THREE.Mesh(geo, material)
    box1.position.set(-10, -4, 0)
    box1.rotateX(4.7)

    box1.receiveShadow = true

    return box1
}

const createPole = () => {
    const geo = new THREE.CylinderGeometry(1, 1, 23, 64, 64)

    const material = new THREE.MeshPhongMaterial({
        color: 0x423f38
    })

    const cyl = new THREE.Mesh(geo, material)
    cyl.position.set(0, 7, 0)

    cyl.castShadow = true

    return cyl
}

const createBackBoard = () => {
    const geo = new THREE.BoxGeometry(14, 10, 1.5)

    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff
    })

    const box2 = new THREE.Mesh(geo, material)
    box2.position.set(-1.6, 20, 0)
    box2.rotateY(7.8)

    box2.castShadow = true

    return box2
}

const createRimStand = () => {
    const geo = new THREE.BoxGeometry(2, 2, 1.5)

    const material = new THREE.MeshPhongMaterial({
        color: 0xff8b17
    })

    const box3 = new THREE.Mesh(geo, material)
    box3.position.set(-3, 17, 0)
    box3.rotateY(7.8)

    box3.castShadow = true

    return box3
}

const createRim = () => {
    const geo = new THREE.TorusGeometry(4, 0.5, 30, 200)

    const material = new THREE.MeshPhongMaterial({
        color: 0xff8b17
    })

    const torus = new THREE.Mesh(geo, material)
    torus.position.set(-7, 17, 0)
    torus.rotateX(14.1)
    torus.rotateZ(1)

    torus.castShadow = true

    return torus
}

const createBasketBall = () => {
    const geo = new THREE.SphereGeometry(3, 32, 16)

    const texture = createLoader().load('./assets/basketball.jpg')
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: texture
    })

    const sphere = new THREE.Mesh(geo, material)
    sphere.position.set(-10, -0.5, 0)

    sphere.castShadow = true

    return sphere
}

const createPointLight = () => {
    const pointlight = new THREE.PointLight(0xffffff, 0.8, 1000)
    
    pointlight.position.set(-20, 30, 10)
    
    pointlight.castShadow = true
    
    return pointlight
}

window.onload = () => {
    init()

    let box1 = createFloor()
    let cyl = createPole()
    let box2 = createBackBoard()
    let box3 = createRimStand()
    let torus = createRim()
    let sphere = createBasketBall()
    
    let pointlight = createPointLight()

    scene.add(box1)
    scene.add(cyl)
    scene.add(box2)
    scene.add(box3)
    scene.add(torus)
    scene.add(sphere)

    scene.add(pointlight)

    let render = () => {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()
}