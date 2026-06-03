import { initXR } from "./xr.js";
import { createCoordinateSystem } from "./coordinateSystem.js";
import { setupTeleport } from "./teleport.js";

const app = initXR();

createCoordinateSystem(app.scene);

setupTeleport(app);

app.renderer.setAnimationLoop(() => {

    app.updateTeleport();

    app.renderer.render(
        app.scene,
        app.camera
    );

});
