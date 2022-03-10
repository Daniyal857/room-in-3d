import Experience from './Experience.js';

import * as THREE from 'three';

export default class ElgatoLight {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.time = this.experience.time;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'elgatoLight',
        expanded: false
      });
    }

    this.setModel();
  }

  setModel() {
    this.model = {};

    this.model.mesh = this.resources.items.elgatoLightModel.scene.children[0];
    this.scene.add(this.model.mesh);

    this.model.mesh.material = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
  }

  update() {}
}
