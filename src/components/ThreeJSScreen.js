import Observer from "./Observer";
import React from "react";
import * as THREE from "three";

class ThreeJSScreen extends Observer {
  constructor(props) {
    super(props);
    this.console = props.console;
    this.console.addObserver(this);

    // Status
    this.state = {
      isPaused: false
    };

    // Counters to monitor framerate
    this.frameCounter = 0;
    this.lastFpsTime = 0;
    this.fps = 0;

    // Special messages to display
    this.texts = [];
  }

  componentDidMount() {
    var width = this.refs.canvasDst.offsetWidth;
    var height = width * 3 / 4;

    this.scene = new THREE.Scene();
    // Go orthographic
    //this.camera = new THREE.PerspectiveCamera(75, width / height,
    //  0.1, 1000);
    this.camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.refs.canvasDst
    });
    this.renderer.setSize(width, height);

    this.texture = new THREE.DataTexture(
      new Uint8Array(256 * 240 * 4)
      .fill(255),
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

  renderFrame(data) {
    this.texture.image.data = data;
    this.texture.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }

  onFullScreenClick = () => {
    this.refs.canvasDst.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    // Try this
    //renderer.setSize( window.innerWidth, window.innerHeight );
  };

  notify(t, e) {
    switch (t) {
      case "frame-ready":
        {
          this.renderFrame(e[0]);
          break;
        }
      case "nes-reset":
        {
          break;
        }
    }
  }

  render() {
    return (
      <div>
        <canvas
          className="nes-screen-canvas"
          ref="canvasDst"
          style={{ width: "100%", height: "100%" }}
        />
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
