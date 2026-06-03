import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export function setupTeleport(app){

    const controller =
        app.renderer.xr.getController(0);

    app.scene.add(controller);

    const points = [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,-1)
    ];

    const geometry =
        new THREE.BufferGeometry()
        .setFromPoints(points);

    const laser =
        new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color:0x00ffff
            })
        );

    laser.scale.z = 10;

    controller.add(laser);

    const marker =
        new THREE.Mesh(
            new THREE.RingGeometry(
                0.15,
                0.2,
                32
            ),
            new THREE.MeshBasicMaterial({
                color:0x00ff00
            })
        );

    marker.rotation.x =
        -Math.PI/2;

    marker.visible = false;

    app.scene.add(marker);

    controller.addEventListener(
        "selectstart",
        ()=>{

            if(!marker.visible)
                return;

            app.player.position.x =
                marker.position.x;

            app.player.position.z =
                marker.position.z;

        }
    );

    app.updateTeleport = ()=>{

        const direction =
            new THREE.Vector3(
                0,
                0,
                -1
            );

        direction.applyQuaternion(
            controller.quaternion
        );

        const origin =
            controller.position.clone();

        if(direction.y < -0.2){

            const t =
                -origin.y /
                direction.y;

            const hit =
                origin.clone().add(
                    direction.multiplyScalar(t)
                );

            marker.visible = true;
            marker.position.copy(hit);

        }else{

            marker.visible = false;

        }

    };

}
