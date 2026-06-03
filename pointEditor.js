import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

let currentX = 0;
let currentY = 0;
let currentZ = 0;

let pointCounter = 1;

export function setupPointEditor(app){

    const group = new THREE.Group();

    group.position.set(-2, 1.5, -2);

    app.scene.add(group);

    const buttons = [];

    function createTextSprite(text){

        const canvas = document.createElement("canvas");

        canvas.width = 512;
        canvas.height = 128;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "white";
        ctx.font = "48px Arial";

        ctx.fillText(text,20,80);

        const texture =
            new THREE.CanvasTexture(canvas);

        const sprite =
            new THREE.Sprite(
                new THREE.SpriteMaterial({
                    map:texture
                })
            );

        sprite.scale.set(1.5,0.4,1);

        return sprite;
    }

    function createButton(text,x,y,callback){

        const button =
            createTextSprite(text);

        button.position.set(x,y,0);

        button.userData.callback =
            callback;

        group.add(button);

        buttons.push(button);

        return button;
    }

    const xLabel = createTextSprite("X: 0");
    xLabel.position.set(0,1.2,0);
    group.add(xLabel);

    const yLabel = createTextSprite("Y: 0");
    yLabel.position.set(0,0.7,0);
    group.add(yLabel);

    const zLabel = createTextSprite("Z: 0");
    zLabel.position.set(0,0.2,0);
    group.add(zLabel);

    function updateLabels(){

        xLabel.material.map.dispose();
        yLabel.material.map.dispose();
        zLabel.material.map.dispose();

        group.remove(xLabel);
        group.remove(yLabel);
        group.remove(zLabel);
    }

    createButton("+",1,1.2,()=>currentX++);
    createButton("-",1.4,1.2,()=>currentX--);

    createButton("+",1,0.7,()=>currentY++);
    createButton("-",1.4,0.7,()=>currentY--);

    createButton("+",1,0.2,()=>currentZ++);
    createButton("-",1.4,0.2,()=>currentZ--);

    createButton(
        "PUNKT",
        0,
        -0.5,
        ()=>{

            app.createPoint(
                currentX,
                currentY,
                currentZ,
                "P"+pointCounter
            );

            pointCounter++;
        }
    );

    const raycaster =
        new THREE.Raycaster();

    const tempMatrix =
        new THREE.Matrix4();

    app.pointEditorUpdate = ()=>{

        const controller =
            app.rightController;

        if(!controller)
            return;

        tempMatrix.identity()
            .extractRotation(
                controller.matrixWorld
            );

        raycaster.ray.origin
            .setFromMatrixPosition(
                controller.matrixWorld
            );

        raycaster.ray.direction
            .set(0,0,-1)
            .applyMatrix4(tempMatrix);

        const hits =
            raycaster.intersectObjects(
                buttons
            );

        if(
            hits.length > 0 &&
            app.triggerPressed
        ){

            hits[0].object.userData.callback();

            app.triggerPressed = false;
        }
    };

}
