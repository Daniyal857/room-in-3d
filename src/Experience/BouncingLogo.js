import Experience from './Experience.js';

import * as THREE from 'three';

export default class BouncingLogo {
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
        title: 'bouncingLogo',
        expanded: true
      });
    }

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = {};

    this.model.group = new THREE.Group();
    this.model.group.position.x = 2.4;
    this.model.group.position.y = 2.9;
    this.model.group.position.z = -4.7;
    this.scene.add(this.model.group);

    this.model.texture = this.resources.items.threejsJourneyLogoTexture;
    this.model.texture.encoding = THREE.sRGBEncoding;

    this.model.geometry = new THREE.PlaneGeometry(4, 1, 1, 1);
    // this.model.geometry.rotateY(Math.PI * 0.5);
    this.model.material = new THREE.MeshBasicMaterial({
      transparent: true,
      map: this.model.texture
    });
    this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material);
    this.model.mesh.scale.x = 0.5;
    this.model.mesh.scale.y = 0.45;
    this.model.group.add(this.model.mesh);

    // Debug
    if (this.debug) {
      this.debugFolder.addInput(this.model.group.position, 'z', {
        label: 'positionZ',
        min: -5,
        max: 5,
        step: 0.001
      });
      this.debugFolder.addInput(this.model.group.position, 'x', {
        label: 'positionX',
        min: -5,
        max: 5,
        step: 0.001
      });
      this.debugFolder.addInput(this.model.group.position, 'y', {
        label: 'positionY',
        min: -5,
        max: 5,
        step: 0.001
      });

      this.debugFolder.addInput(this.model.mesh.scale, 'x', {
        label: 'scaleX',
        min: 0.001,
        max: 1,
        step: 0.001
      });

      this.debugFolder.addInput(this.model.mesh.scale, 'y', {
        label: 'scaleY',
        min: 0.001,
        max: 1,
        step: 0.001
      });
    }
  }

  setAnimation() {
    this.animations = {};

    this.animations.x = 0;
    this.animations.y = 0;

    this.animations.limits = {};
    this.animations.limits.x = { min: -1.13, max: 0.85 };
    this.animations.limits.y = { min: -0.9, max: 0.85 };

    this.animations.speed = {};
    this.animations.speed.x = 0.0005;
    this.animations.speed.y = 0.0004;

    if (this.debug) {
      this.debugFolder.addInput(this.animations.limits.x, 'min', {
        label: 'limitXMin',
        min: -3,
        max: 0,
        step: 0.001
      });
      this.debugFolder.addInput(this.animations.limits.x, 'max', {
        label: 'limitXMax',
        min: 0,
        max: 3,
        step: 0.001
      });
      this.debugFolder.addInput(this.animations.limits.y, 'min', {
        label: 'limitYMin',
        min: -3,
        max: 0,
        step: 0.001
      });
      this.debugFolder.addInput(this.animations.limits.y, 'max', {
        label: 'limitYMax',
        min: 0,
        max: 3,
        step: 0.001
      });
      this.debugFolder.addInput(this.animations.speed, 'x', {
        label: 'speedX',
        min: 0,
        max: 0.01,
        step: 0.0001
      });
      this.debugFolder.addInput(this.animations.speed, 'y', {
        label: 'speedY',
        min: 0,
        max: 0.01,
        step: 0.0001
      });
    }
  }

  update() {
    this.animations.x += this.animations.speed.x * this.time.delta;
    this.animations.y += this.animations.speed.y * this.time.delta;

    if (
      this.animations.x > this.animations.limits.x.max ||
      this.animations.x < this.animations.limits.x.min
    ) {
      this.animations.speed.x *= -1;
    }

    if (
      this.animations.y > this.animations.limits.y.max ||
      this.animations.y < this.animations.limits.y.min
    ) {
      this.animations.speed.y *= -1;
    }

    this.model.mesh.position.x = this.animations.x;
    this.model.mesh.position.y = this.animations.y;
  }
}
