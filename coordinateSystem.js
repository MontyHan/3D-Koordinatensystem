import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export function createCoordinateSystem(scene){

    const grid =
        new THREE.GridHelper(
            40,
            40,
            0x888888,
            0x444444
        );

    scene.add(grid);

    const axes =
        new THREE.AxesHelper(5);

    scene.add(axes);

}
