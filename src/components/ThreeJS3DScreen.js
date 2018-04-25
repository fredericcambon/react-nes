import "../../node_modules/react-dat-gui/build/react-dat-gui.css";

import _ from "lodash";

import Observer from "./Observer";
import React from "react";
import * as THREE from "three";
import OrbitControls from "../utils/threejs/OrbitControls.js";
import DatGui, { DatBoolean, DatNumber, DatFolder } from "react-dat-gui";

class ThreeJSScreen extends Observer {
  constructor(props) {
    super(props);
    this.console = props.console;
    this.console.addObserver(this);

    // Status
    this.state = {
      isPaused: false,
      datGui: {
        use3DSprites: true,
        spritesDepth: 0.05,
        cameraY: -2,
        cameraZ: 3,
        cameraX: 0
      }
    };

    // Counters to monitor framerate
    this.frameCounter = 0;
    this.lastFpsTime = 0;
    this.fps = 0;

    // Special messages to display
    this.texts = [];

    // NES rendering related vars
    this.nesWidth = 256;
    this.nesHeight = 240;
    this.spriteMeshes = [];
    this.activeSpriteMesh = 0;
    this.x = 0;
    this.y = 0;
    this.i = 0;
  }

  componentDidMount() {
    var width = this.refs.canvasDst.offsetWidth;
    var height = width * 3 / 4;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.refs.canvasDst
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
      new Uint8Array(this.nesWidth * this.nesHeight * 4).fill(0xff),
      this.nesWidth,
      this.nesHeight,
      THREE.RGBAFormat
    );
    this.backgroundTexture.flipY = true;

    var material = new THREE.MeshBasicMaterial({
      map: this.backgroundTexture
    });
    var geometry = new THREE.PlaneGeometry(2.56, 2.4, 1);
    this.cube = new THREE.Mesh(geometry, [material]);
    this.scene.add(this.cube);

    // Meshes for fake 3D sprites
    var spriteGeometry = new THREE.BoxGeometry(
      0.01,
      0.01,
      this.state.datGui.spritesDepth
    );

    for (let x = 0; x < 8196; x++) {
      var cube = new THREE.Mesh(spriteGeometry, new THREE.MeshBasicMaterial());
      this.spriteMeshes.push(cube);
      this.scene.add(cube);
    }
  }

  getColor(data, i) {
    return (data[i] << 16) + (data[i + 1] << 8) + data[i + 2];
  }

  updateSpriteMesh(mesh, color) {
    mesh.position.x = (this.x - this.nesWidth / 2) / 100;
    mesh.position.y = (this.y - this.nesHeight / 2) / 100 * -1;
    mesh.scale.z = this.state.datGui.spritesDepth;
    mesh.position.z =
      mesh.geometry.parameters.depth * this.state.datGui.spritesDepth;
    mesh.material.color.setHex(color);
    mesh.visible = true;
  }

  renderFrame(fullData, backgroundData, spritesData, colorData) {
    this.controls.update();

    if (this.state.datGui.use3DSprites) {
      this.backgroundTexture.image.data = backgroundData;
      this.activeSpriteMesh = 0;

      for (this.y = 0; this.y < 240; this.y++) {
        for (this.x = 0; this.x < 256; this.x++) {
          this.i = this.y * this.nesWidth + this.x;
          if (spritesData[this.i * 4] !== -1) {
            this.updateSpriteMesh(
              this.spriteMeshes[this.activeSpriteMesh],
              this.getColor(fullData, this.i * 4)
            );
            this.activeSpriteMesh++;
          }
        }
      }

      for (
        ;
        this.activeSpriteMesh < this.spriteMeshes.length;
        this.activeSpriteMesh++
      ) {
        this.spriteMeshes[this.activeSpriteMesh].visible = false;
      }
    } else {
      this.backgroundTexture.image.data = fullData;
    }

    this.backgroundTexture.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  onFullScreenClick = () => {
    this.refs.canvasDst.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    // Try this
    //renderer.setSize( window.innerWidth, window.innerHeight );
  };

  onPauseClick = () => {
    if (!this.state.isPaused) {
      this.console.stop();
    } else {
      this.console.start();
    }

    this.setState({
      isPaused: !this.state.isPaused
    });
  };

  notify(t, e) {
    switch (t) {
      case "frame-ready": {
        this.renderFrame(...e);
        break;
      }
      case "nes-reset": {
        break;
      }
    }
  }

  onDatGuiUpdate(datGui) {
    this.setState({ datGui });
  }

  render() {
    const { datGui } = this.state;

    return (
      <div>
        <canvas
          className="nes-screen-canvas"
          ref="canvasDst"
          style={{ width: "100%", height: "100%" }}
        />
        <DatGui data={datGui} onUpdate={this.onDatGuiUpdate.bind(this)}>
          <DatFolder title="3D Sprites">
            <DatBoolean path="use3DSprites" label="Use 3D Sprites" />
            <DatNumber
              path="spritesDepth"
              label="3D Sprites Depth"
              min={0.05}
              max={0.2}
              step={0.01}
            />
          </DatFolder>
        </DatGui>

        <div
          id="overlay"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            height: "3rem"
          }}
        >
          <div
            className="fa-stack fa-lg pull-right"
            onClick={this.onFullScreenClick}
          >
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-expand fa-stack-1x fa-inverse" />
          </div>
          <div
            className="fa-stack fa-lg pull-right"
            onClick={this.onPauseClick}
          >
            <i className="fa fa-square fa-stack-2x" />
            {this.state.isPaused ? (
              <i className="fa fa-play fa-stack-1x fa-inverse" />
            ) : (
              <i className="fa fa-pause fa-stack-1x fa-inverse" />
            )}
          </div>
          <div className="fa-stack fa-lg pull-right">
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-floppy-o fa-stack-1x fa-inverse" />
          </div>
          <div className="fa-stack fa-lg pull-right" onClick={this.onHelpClick}>
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-question fa-stack-1x fa-inverse" />
          </div>
        </div>
      </div>
    );
  }
}

export default ThreeJSScreen;
