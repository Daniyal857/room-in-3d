import * as THREE from 'three';

import Experience from './Experience.js';
import vertexShader from './Shaders/coffeeSteam/vertex.glsl';
import fragmentShader from './Shaders/coffeeSteam/fragment.glsl';

export default class CoffeeSteam {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'coffeeSteam',
        expanded: false
      });
    }

    this.setModel();
  }

  setModel() {
    this.model = {};
    this.model.material = new THREE.ShaderMaterial({
      // wireframe: true,
      vertexShader,
      fragmentShader,
      transparent: true
    });
    this.model.mesh = this.resources.items.coffeeSteamModel.scene.children[0];
    this.model.mesh.material = this.model.material;
    this.scene.add(this.model.mesh);
    console.log('mesh', this.model.mesh);
  }

  update() {}
}
