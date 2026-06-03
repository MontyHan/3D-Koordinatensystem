import * as THREE from 'three';

export class CoordinateSystem {
  constructor(scene, size = 5) {
    this.scene = scene;
    this.size = size;
    this.setupAxes();
    this.setupGrid();
  }

  setupAxes() {
    // X-Achse (rot)
    const xAxis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-this.size, 0, 0),
        new THREE.Vector3(this.size, 0, 0)
      ]),
      new THREE.LineBasicMaterial({ color: 0xff0000 })
    );
    this.scene.add(xAxis);

    // Y-Achse (grün)
    const yAxis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -this.size, 0),
        new THREE.Vector3(0, this.size, 0)
      ]),
      new THREE.LineBasicMaterial({ color: 0x00ff00 })
    );
    this.scene.add(yAxis);

    // Z-Achse (blau)
    const zAxis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -this.size),
        new THREE.Vector3(0, 0, this.size)
      ]),
      new THREE.LineBasicMaterial({ color: 0x0000ff })
    );
    this.scene.add(zAxis);
  }

  setupGrid() {
    const gridHelper = new THREE.GridHelper(this.size * 2, this.size * 2);
    this.scene.add(gridHelper);
  }
}
