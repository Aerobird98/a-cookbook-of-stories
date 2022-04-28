import Phaser from "phaser";
import RexPinchPlugin from "phaser3-rex-plugins/dist/rexpinchplugin";

const IMAGE_NAME = "FRAMES";
const SEPERATOR = "_";
const START_NUMBER = 0;
const IMAGE_WIDTH = 986;
const IMAGE_HEIGHT = 1080;
const PAGES = 5;
const PAGE_MARGIN = 0;
const FRAMES = 24;
const FPS = 12;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_FACTOR = 0.1;

let to4Digits = (x) => {
  var number = "000" + x;
  return number.substring(number.length - 4);
};

class PrePreloader extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.setPath("");
    this.load.atlas("LOADING");
    this.load.on("progress", this.progress);
    this.load.on("complete", this.complete, {
      scene: this.scene,
    });
  }

  progress(percentage) {
    console.log((percentage * 100).toFixed(2) + "%");
  }

  complete() {
    console.log("COMPLETE");
    this.scene.start("preloader");
  }
}

class Preloader extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    let frames = [];
    for (let i = 0; i < FRAMES; i++) {
      frames.push({
        key: "LOADING",
        frame: "LOADING" + SEPERATOR + to4Digits(i),
      });
    }
    this.anims.create({
      key: "gif",
      frames: frames,
      repeat: -1,
      frameRate: FPS,
    });

    this.add
      .sprite(IMAGE_WIDTH / 2, IMAGE_HEIGHT / 2 - 60, "LOADING", "LOADING_0000")
      .play("gif")
      .setOrigin(0.5, 0.5);

    let text = this.add
      .text(IMAGE_WIDTH / 2, IMAGE_HEIGHT / 2, "LOADING: 0.00%", {
        fontFamily: "Garet, sans-serif",
        fontSize: "2rem",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    this.load.setPath("img/");
    for (let i = 0; i < PAGES; i++) {
      for (let j = START_NUMBER; j < FRAMES + START_NUMBER; j++) {
        this.load.image(i + "/" + IMAGE_NAME + SEPERATOR + to4Digits(j));
      }
    }

    //"https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js"
    this.load.setPath("");
    this.load.plugin("RexPinchPlugin", RexPinchPlugin, true);

    this.load.on("progress", this.progress, { text: text });
    this.load.on("complete", this.complete, {
      scene: this.scene,
      text: text,
    });
  }

  progress(percentage) {
    console.log((percentage * 100).toFixed(2) + "%");
    this.text.setText("LOADING: " + (percentage * 100).toFixed(2) + "%");
  }
  complete() {
    console.log("COMPLETE");
    this.text.setText("COMPLETE");
    this.scene.start("main");
  }
}

class Main extends Phaser.Scene {
  constructor() {
    super();
  }

  create() {
    let dragScale = this.plugins.get("RexPinchPlugin").add(this);
    let separator = PAGE_MARGIN;
    let height;
    let camera = this.cameras.main;
    this;
    let frames = [];

    for (let i = 0; i < PAGES; i++) {
      frames[i] = [];
      for (let j = START_NUMBER; j < FRAMES + START_NUMBER; j++) {
        frames[i].push({
          key: i + "/" + IMAGE_NAME + SEPERATOR + to4Digits(j),
        });
      }

      this.anims.create({
        key: "gif" + i,
        frames: frames[i],
        repeat: -1,
        frameRate: FPS,
      });

      this.add
        .sprite(0, separator, "")
        .play("gif" + i)
        .setOrigin(0);
      separator += IMAGE_HEIGHT + PAGE_MARGIN;
    }
    height = separator - PAGE_MARGIN * PAGES;

    camera.setBounds(0, 0, IMAGE_WIDTH, separator);
    camera.zoom = MIN_ZOOM;
    camera.scrollX = 0;
    camera.scrollY = 0;

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (deltaY > 0) {
        if (camera.zoom - ZOOM_FACTOR >= MIN_ZOOM) {
          camera.zoom -= ZOOM_FACTOR;
        }
      } else if (deltaY < 0) {
        if (camera.zoom + ZOOM_FACTOR <= MAX_ZOOM) {
          camera.zoom += ZOOM_FACTOR;
        }
      } else {
        // Do nothing.
      }
    });

    dragScale
      .on("drag1", function (dragScale) {
        let drag1Vector = dragScale.drag1Vector;
        camera.scrollX -= drag1Vector.x / camera.zoom;
        camera.scrollY -= drag1Vector.y / camera.zoom;
      })
      .on(
        "pinch",
        function (dragScale) {
          let zoomFactor = dragScale.scaleFactor;
          if (
            camera.zoom * zoomFactor >= MIN_ZOOM &&
            camera.zoom * zoomFactor <= MAX_ZOOM
          ) {
            camera.zoom *= zoomFactor;
          }
        },
        this
      );

    let downTime = 0;
    this.input.on("pointerdown", (pointer) => {
      if (dragScale.isPinched) {
        return;
      }
      if (pointer.time - downTime < 200) {
        downTime = 0;
        this.scale.toggleFullscreen();
      } else {
        downTime = pointer.time;
      }
    });
  }
}

const config = {
  type: Phaser.AUTO,
  title: "A CookBook of Stories",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
};

const game = new Phaser.Game(config);

game.scene.add("prepreloader", PrePreloader);
game.scene.add("preloader", Preloader);
game.scene.add("main", Main);
game.scene.start("prepreloader");
