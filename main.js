import { XRApp } from './src/core/xr.js';
import { CoordinateSystem } from './src/math/axes.js';

// Hauptanwendung starten
const app = new XRApp();
document.body.appendChild(app.renderer.domElement);

// Koordinatensystem hinzufügen
const coordinateSystem = new CoordinateSystem(app.scene, 5);

// Animation starten
app.animate();
