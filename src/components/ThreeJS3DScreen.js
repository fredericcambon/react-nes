import "../../node_modules/react-dat-gui/build/react-dat-gui.css";

import React from "react";
import * as THREE from "three";
import _ from "lodash";
import DatGui, { DatBoolean, DatNumber, DatFolder } from "react-dat-gui";

import BaseRenderer from "./BaseRenderer.js";
import OrbitControls from "../utils/threejs/OrbitControls.js";
import { NES_WIDTH, NES_HEIGHT } from "../utils/constants";

class ThreeJSScreen extends React.Component {
  constructor(props) {
    super(props);
    this.console = props.console;

    // Split renderinng mode : sprite & backgrounnd
    // in different arrays
    this.console.ppu.setRenderingMode(1);

    // Status
    this.state = {
      datGui: {
        use3DSprites: true
      }
    };
  }

  onInitCanvas(canvas) {
    var width = canvas.offsetWidth;
    var height = (width * 3) / 4;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    this.renderer.setSize(width, height);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 3;
    this.camera.position.y = -2;
    this.camera.position.x = 0;
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enableKeys = false;
    this.controls.enablePan = false;
    this.controls.dampingFactor = 0.25;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 20;
    this.controls.minPolarAngle = Math.PI * 0.25;
    this.controls.maxPolarAngle = Math.PI * 0.75;
    this.controls.minAzimuthAngle = -(Math.PI / 4);
    this.controls.maxAzimuthAngle = Math.PI / 4;

    // Lights
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(this.directionalLight);
    this.scene.add(this.hemiLight);

    // World

    // Plane where NES is rendered as a texture
    this.backgroundTexture = new THREE.DataTexture(
      new Uint8Array(NES_WIDTH * this.nesHeightNES_HEIGHT * 4).fill(0xff),
      NES_WIDTH,
      NES_HEIGHT,
      THREE.RGBAFormat
    );
    this.backgroundTexture.flipY = true;

    // Sprite texture
    this.spriteTexture = new THREE.DataTexture(
      new Uint8Array(NES_WIDTH * NES_HEIGHT * 4).fill(0xff),
      NES_WIDTH,
      NES_HEIGHT,
      THREE.RGBAFormat
    );
    this.spriteTexture.flipY = true;

    var backgroundMaterial = new THREE.MeshBasicMaterial({
      map: this.backgroundTexture
    });
    var backgroundGeometry = new THREE.PlaneGeometry(2.56, 2.4, 1);
    var spriteMaterial = new THREE.MeshBasicMaterial({
      map: this.spriteTexture
    });
    spriteMaterial.transparent = true;
    var spriteGeometry = new THREE.PlaneGeometry(2.56, 2.4, 1);

    this.backgroundMesh = new THREE.Mesh(backgroundGeometry, [
      backgroundMaterial
    ]);
    this.spriteMesh = new THREE.Mesh(spriteGeometry, [spriteMaterial]);
    this.spriteMesh.position.z = 0.05;

    this.scene.add(this.backgroundMesh);
    this.scene.add(this.spriteMesh);
  }

  onRenderFrame(fullData, backgroundData, spritesData, colorData) {
    this.controls.update();

    this.backgroundTexture.image.data = backgroundData;
    this.backgroundTexture.needsUpdate = true;

    if (this.state.datGui.use3DSprites) {
      this.spriteTexture.image.data = spritesData;
      this.spriteTexture.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }

  onUpdateMeta(metadata) {}

  onDatGuiUpdate(datGui) {
    this.setState({ datGui });
    this.console.ppu.setRenderingMode(datGui.use3DSprites ? 1 : 0);

    if (!datGui.use3DSprites) {
      this._hideSpriteMeshes(0);
    }
  }

  render() {
    const { datGui } = this.state;

    return (
      <div>
        <DatGui data={datGui} onUpdate={this.onDatGuiUpdate.bind(this)}>
          <DatFolder title="3D Sprites">
            <DatBoolean path="use3DSprites" label="Use 3D Sprites" />
          </DatFolder>
        </DatGui>

        <BaseRenderer
          console={this.console}
          onInitCanvas={this.onInitCanvas.bind(this)}
          onRenderFrame={this.onRenderFrame.bind(this)}
          onUpdateMeta={this.onUpdateMeta.bind(this)}
        />
      </div>
    );
  }
}

export default ThreeJSScreen;
