import { VRButton } from 'https://unpkg.com/three@0.160.0/examples/jsm/webxr/VRButton.js';

export function initXR(renderer) {
  document.body.appendChild(VRButton.createButton(renderer));
}
