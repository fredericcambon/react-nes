import Observer from "./Observer";
import BaseRenderer from "./BaseRenderer.js";
import React from "react";
import {
  BaseTexture,
  Texture,
  Sprite,
  WebGLRenderer,
  Container
} from "pixi.js";

class Screen extends React.Component {
  /*
   * Handles the display of the NES at each frame
   */
  constructor(props) {
    super(props);
    this.console = props.console;

    this.console.ppu.setRenderingMode(0);
  }

  componentDidMount() {
    // Special messages to display
    this.fps = 0;
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

  onInitCanvas(canvas) {
    var width = canvas.offsetWidth;
    var height = (width * 3) / 4;

    this.offscreenCanvas = document.createElement("canvas");
    this.offscreenCanvas.width = 256;
    this.offscreenCanvas.height = 240;
    this.canvasContext = this.offscreenCanvas.getContext("2d");
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "10px Arial";
    this.canvasImage = this.canvasContext.getImageData(0, 0, 256, 240);

    this.renderer = new WebGLRenderer(width, height, {
      view: canvas
    });

    this.container = new Container();
    this.texture = Texture.fromCanvas(this.offscreenCanvas);
    this.sprite = new Sprite(this.texture);
    this.sprite.width = width;
    this.sprite.height = height;
    this.container.addChild(this.sprite);
  }

  componentWillUnmount() {}

  onRenderFrame(data) {
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

  onMessage(t) {
    switch (t) {
      case "nes-quick-save": {
        this.texts.push({
          msg: () => {
            return "Game Saved";
          },
          x: 256 / 2 - 42,
          y: 240 / 2,
          font: "bold 14px Arial",
          timeout: 60
        });
        break;
      }
      case "nes-quick-load":
      case "nes-reset": {
        this.texts.push({
          msg: () => {
            return "Game Loaded";
          },
          x: 256 / 2 - 42,
          y: 240 / 2,
          font: "bold 14px Arial",
          timeout: 60
        });
        break;
      }
    }
  }

  onUpdateMeta(metadata) {
    this.fps = metadata.fps;
  }

  render() {
    return (
      <div>
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

export default Screen;
