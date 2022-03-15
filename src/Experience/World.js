import * as THREE from 'three';
import Experience from './Experience.js';
import GoogleLeds from './GoogleLeds.js';
import CoffeeSteam from './CoffeeSteam.js';
import TopChair from './TopChair.js';
import BouncingLogo from './BouncingLogo.js';
import ElgatoLight from './ElgatoLight.js';
import Screen from './Screen.js';

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('groupEnd', _group => {
      if (_group.name === 'base') {
        // this.setDummy();
        this.setRoom();
        this.setGoogleLeds();
        // this.setCoffeeSteam();
        this.setTopChair();
        this.setBouncingLogo();
        // this.setElgatoLight();
        this.setScreens();
      }
    });
  }

  // setDummy()
  // {
  //     const cube = new THREE.Mesh(
  //         new THREE.BoxGeometry(1, 1, 1),
  //         new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
  //     )
  //     this.scene.add(cube)
  // }

  setRoom() {
    this.room = {};
    this.room.model = this.resources.items.roomModel.scene;

    this.room.texture = this.resources.items.bakedTexture;
    this.room.texture.encoding = THREE.sRGBEncoding;
    this.room.texture.flipY = false;

    this.room.material = new THREE.MeshBasicMaterial({
      map: this.room.texture
    });

    this.room.model.traverse(_child => {
      if (_child instanceof THREE.Mesh) {
        _child.material = this.room.material;
      }
    });

    this.scene.add(this.room.model);
  }

  setGoogleLeds() {
    this.googleLeds = new GoogleLeds();
  }

  setCoffeeSteam() {
    this.coffeeSteam = new CoffeeSteam();
  }

  setTopChair() {
    this.topChair = new TopChair();
  }

  setBouncingLogo() {
    this.bouncingLogo = new BouncingLogo();
  }

  // setElgatoLight() {
  //   this.elgatoLight = new ElgatoLight();
  // }

  setScreens() {
    this.pcScreen = new Screen(
      this.resources.items.monitorScreenModel.scene.children[0],
      '/assets/videoRoom.mp4'
    );
    this.macScreen = new Screen(
      this.resources.items.macScreenModel.scene.children[0],
      '/assets/videoPortal.mp4'
    );
  }

  resize() {}

  update() {
    if (this.googleLeds) this.googleLeds.update();
    if (this.coffeeSteam) this.coffeeSteam.update();
    if (this.topChair) this.topChair.update();
    if (this.bouncingLogo) this.bouncingLogo.update();
  }

  destroy() {}
}
