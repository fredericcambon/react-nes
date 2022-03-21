import Observer from "./Observer";
import React from "react";
import BaseRenderer from "./BaseRenderer.js";
import * as THREE from "three";
import { NES_WIDTH, NES_HEIGHT } from "../utils/constants";

class ThreeJSScreen extends React.Component {
  constructor(props) {
    super(props);
    this.console = props.console;

    this.console.ppu.setRenderingMode(0);
  }

  onInitCanvas(canvas) {
    var width = canvas.offsetWidth;
    var height = (width * 3) / 4;

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    this.renderer.setSize(width, height);

    this.texture = new THREE.DataTexture(
      new Uint8Array(NES_WIDTH * NES_HEIGHT * 4).fill(255),
      NES_WIDTH,
      NES_HEIGHT,
      THREE.RGBAFormat
    );
    this.texture.needsUpdate = true;
    this.texture.flipY = true;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture
    });

    this.geometry = new THREE.PlaneGeometry(width, height, 1);
    this.cube = new THREE.Mesh(this.geometry, [this.material]);

    this.scene.add(this.camera);
    this.camera.position.z = 1;
    this.scene.add(this.cube);
  }

  onRenderFrame(data) {
    this.texture.image.data = data;
    this.texture.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }

  onUpdateMeta(metadata) {}

  render() {
    return (
      <div>
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
