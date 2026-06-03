import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export function setupPoints(app){

    app.points = [];

    app.createPoint = (
        x,
        y,
        z,
        name
    )=>{

        const position =
            new THREE.Vector3(
                x,
                y,
                z
            );

        const sphere =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.1,
                    16,
                    16
                ),

                new THREE.MeshStandardMaterial({
                    color:0xffff00
                })

            );

        sphere.position.copy(position);

        app.scene.add(sphere);

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.width = 1024;
        canvas.height = 256;

        const ctx =
            canvas.getContext("2d");

        ctx.fillStyle = "white";

        ctx.font = "72px Arial";

        ctx.fillText(
            `${name} (${x}|${y}|${z})`,
            20,
            120
        );

        const sprite =
            new THREE.Sprite(

                new THREE.SpriteMaterial({

                    map:
                    new THREE.CanvasTexture(
                        canvas
                    )

                })

            );

        sprite.scale.set(
            2.5,
            0.6,
            1
        );

        sprite.position.copy(
            position.clone().add(
                new THREE.Vector3(
                    0,
                    0.3,
                    0
                )
            )
        );

        app.scene.add(sprite);

        const arrow =
            new THREE.ArrowHelper(

                position.length()===0
                ?
                new THREE.Vector3(
                    1,
                    0,
                    0
                )
                :
                position.clone()
                    .normalize(),

                new THREE.Vector3(),

                position.length(),

                0xffffff

            );

        app.scene.add(arrow);

        app.points.push({

            name,

            mesh:sphere,

            label:sprite,

            arrow,

            position,

            selected:false

        });

    };

}
