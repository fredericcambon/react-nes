import Observer from "./Observer";
import React from "react";
import BaseRenderer from "./BaseRenderer.js";
import * as THREE from "three";

class ThreeJSScreen extends React.Component {
  constructor(props) {
    super(props);
    this.console = props.console;

    // Status
    this.state = {
      isPaused: false,
      fps: 0
    };

    // Special messages to display
    this.texts = [];
  }

  onInitCanvas(canvas) {
    var width = canvas.offsetWidth;
    var height = width * 3 / 4;

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
      new Uint8Array(256 * 240 * 4).fill(255),
      256,
      240,
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

  onUpdateMeta(metadata) {
    this.setState({ fps: metadata.fps });
  }

  onMessage(t) {
    switch (t) {
      case "nes-quick-save": {
        this.setState({ message: "Game Saved" });
        break;
      }
      case "nes-quick-load":
      case "nes-reset": {
        this.setState({ message: "Game Loaded" });
        break;
      }
    }

    setTimeout(() => {
      this.setState({ message: "" });
    }, 2000);
  }

  render() {
    var fpsStyle = {
      position: "absolute",
      top: 10,
      left: 21,
      textAlign: "left",
      zIndex: "100",
      display: "block"
    };

    var messageStyle = {
      position: "absolute",
      left: "40%",
      top: "50%",
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold"
    };

    return (
      <div>
        <div id="fps" style={fpsStyle}>
          {this.state.fps} FPS
        </div>
        <div id="message" style={messageStyle}>
          {this.state.message}
        </div>

        <BaseRenderer
          console={this.console}
          onInitCanvas={this.onInitCanvas.bind(this)}
          onRenderFrame={this.onRenderFrame.bind(this)}
          onMessage={this.onMessage.bind(this)}
          onUpdateMeta={this.onUpdateMeta.bind(this)}
        />
      </div>
    );
  }
}

export default ThreeJSScreen;
