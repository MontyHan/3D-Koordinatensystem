import * as THREE from 'three';

export class FloatingPanel {
  constructor(scene, position = new THREE.Vector3(0, 1.5, -1)) {
    this.scene = scene;
    this.position = position;
    this.panel = null;
    this.setupPanel();
  }

  setupPanel() {
    // Panel-Grundgerüst (später mit CSS2DRenderer)
    const panelGeometry = new THREE.BoxGeometry(1, 0.5, 0.1);
    const panelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    this.panel = new THREE.Mesh(panelGeometry, panelMaterial);
    this.panel.position.copy(this.position);
    this.scene.add(this.panel);
  }

  updateText(text) {
    // Platzhalter für Text-Update (später mit CSS2D/3D-Renderer)
    console.log("Panel-Text aktualisiert:", text);
  }
}
