import { initXR } from "./xr.js";
import { createCoordinateSystem } from "./coordinateSystem.js";
import { setupTeleport } from "./teleport.js";
import { setupPoints } from "./points.js";
import { setupPointEditor } from "./pointEditor.js";

const app = initXR();

createCoordinateSystem(app.scene);
setupPoints(app);

setupPointEditor(app);

setupTeleport(app);

app.renderer.setAnimationLoop(() => {

    app.updateTeleport();

    app.renderer.render(
        app.scene,
        app.camera
    );
    if(app.pointEditorUpdate)
    app.pointEditorUpdate();
});
