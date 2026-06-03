import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

import {
VRButton
}
from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/webxr/VRButton.js";

export function initXR(){

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const player = new THREE.Group();

    const camera =
        new THREE.PerspectiveCamera(
            70,
            window.innerWidth/window.innerHeight,
            0.1,
            1000
        );

    camera.position.set(0,1.6,4);

    player.add(camera);
    scene.add(player);

    const renderer =
        new THREE.WebGLRenderer({
            antialias:true
        });

    renderer.xr.enabled = true;

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document.body.appendChild(
        renderer.domElement
    );

    document.body.appendChild(
        VRButton.createButton(renderer)
    );

    scene.add(
        new THREE.HemisphereLight(
            0xffffff,
            0x444444,
            2
        )
    );

    window.addEventListener(
        "resize",
        ()=>{
            camera.aspect=
                window.innerWidth/
                window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );
        }
    );
    const rightController =
    renderer.xr.getController(0);

scene.add(rightController);

let triggerPressed = false;

rightController.addEventListener(
    "selectstart",
    ()=>{
        triggerPressed = true;
    }
);
    return {
        scene,
        camera,
        renderer,
        player,
        rightController,
        triggerPressed
    };

}
