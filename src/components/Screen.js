import Observer from "./Observer";
import React from "react";
import {
  BaseTexture,
  Texture,
  Sprite,
  WebGLRenderer,
  Container
} from "pixi.js";

class Screen extends Observer {
  /*
   * Handles the display of the NES at each frame
   */
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
    this.texts.push({
      msg: () => {
        return this.fps + " fps";
      },
      x: 2,
      y: 10,
      font: "10px Arial"
    });
  }

  componentDidMount() {
    var width = this.refs.canvasDst.offsetWidth;
    var height = width * 3 / 4;

    this.offscreenCanvas = document.createElement("canvas");
    this.offscreenCanvas.width = 256;
    this.offscreenCanvas.height = 240;
    this.canvasContext = this.offscreenCanvas.getContext("2d");
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "10px Arial";
    this.canvasImage = this.canvasContext.getImageData(0, 0, 256, 240);

    this.interval = setInterval(this.fpsLogger.bind(this), 1000);

    this.renderer = new WebGLRenderer(width, height, {
      view: this.refs.canvasDst
    });

    this.container = new Container();
    this.texture = Texture.fromCanvas(this.offscreenCanvas);
    this.sprite = new Sprite(this.texture);
    this.sprite.width = width;
    this.sprite.height = height;
    this.container.addChild(this.sprite);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderFrame(data) {
    this.frameCounter++;
    this.canvasImage.data.set(data);
    this.canvasContext.putImageData(this.canvasImage, 0, 0);

    // Checks if there are any message to display on screen
    for (let i = 0; i < this.texts.length; i++) {
      let txt = this.texts[i];
      this.canvasContext.font = txt.font;
      this.canvasContext.fillText(txt.msg(), txt.x, txt.y);

      if (txt.timeout) {
        txt.timeout--;

        if (txt.timeout === 0) {
          this.texts.pop(i);
        }
      }
    }

    this.sprite.texture.update();
    this.renderer.render(this.container);
  }

  resetMessage() {
    this.texts.push({
      msg: () => {
        return "Game Loaded";
      },
      x: 256 / 2 - 42,
      y: 240 / 2,
      font: "bold 14px Arial",
      timeout: 120
    });
  }

  notify(t, e) {
    switch (t) {
      case "frame-ready": {
        this.renderFrame(e);
        break;
      }
      case "nes-reset": {
        this.resetMessage();
        break;
      }
    }
  }

  fpsLogger() {
    var now = new Date();

    this.fps = parseInt(this.frameCounter / ((now - this.lastFpsTime) / 1000));
    this.frameCounter = 0;
    this.lastFpsTime = now;
  }

  onFullScreenClick = () => {
    this.refs.canvasDst.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  };

  onHelpClick = () => {
    this.props.onHelpClick();
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

export default Screen;
