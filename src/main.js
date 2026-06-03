import { initScene } from './core/scene.js';
import { initXR } from './core/xr.js';

let scene, camera, renderer;

init();

function init() {
  const setup = initScene();
  scene = setup.scene;
  camera = setup.camera;
  renderer = setup.renderer;

  initXR(renderer);

  renderer.setAnimationLoop(render);
}

function render() {
  renderer.render(scene, camera);
}
