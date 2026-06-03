import * as THREE from 'three';

export class TeleportController {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.teleportTarget = null;
    this.setupTeleportLaser();
  }

  setupTeleportLaser() {
    // Laser für linken Controller (grün)
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -10)
    ]);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    this.laser = new THREE.Line(geometry, material);
    this.laser.visible = false;
    this.scene.add(this.laser);

    // Zielkreis (rot)
    const circleGeometry = new THREE.CircleGeometry(0.2, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.teleportTarget = new THREE.Mesh(circleGeometry, circleMaterial);
    this.teleportTarget.visible = false;
    this.scene.add(this.teleportTarget);
  }

  updateController(controller) {
    if (!controller || !this.teleportTarget) return;

    // Laser aktualisieren (Position & Rotation)
    this.laser.position.copy(controller.position);
    this.laser.quaternion.copy(controller.quaternion);

    // Raycasting für Teleport-Ziel (einfache Bodenebene)
    const intersects = this.raycastGround(controller);
    if (intersects.length > 0) {
      const point = intersects[0].point;
      this.teleportTarget.position.copy(point);
      this.teleportTarget.visible = true;
      this.laser.visible = true;

      // Teleport bei Trigger-Druck (linker Controller: Button 0)
      if (controller.userData.gamepad && controller.userData.gamepad.buttons[0].pressed) {
        this.camera.position.copy(point);
        this.teleportTarget.visible = false;
        this.laser.visible = false;
      }
    } else {
      this.teleportTarget.visible = false;
      this.laser.visible = false;
    }
  }

  raycastGround(controller) {
    // Einfache Raycasting-Logik (für Bodenebene)
    const raycaster = new THREE.Raycaster();
    raycaster.set(controller.position, controller.getWorldDirection(new THREE.Vector3()));
    return raycaster.intersectObjects([this.scene]); // In der Praxis: Boden-Objekt hinzufügen
  }
}
