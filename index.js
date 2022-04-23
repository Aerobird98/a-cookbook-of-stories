import Phaser from "phaser";

const IMAGE_NAME = "FRAMES";
const SEPERATOR = "_";
const START_NUMBER = 10;
const IMAGE_WIDTH = 1826;
const IMAGE_HEIGHT = 2000;
const PAGES = 5;
const PAGE_BOTTOM_MARGIN = 0;
const FRAMES = 24;
const FPS = 12;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_FACTOR = 0.1;

let to4Digits = (x) => {
  var number = "000" + x;
  return number.substring(number.length - 4);
};

class Main extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.setPath("img/");
    for (let i = 0; i < PAGES; i++) {
      for (let j = START_NUMBER; j < FRAMES + START_NUMBER; j++) {
        this.load.image(i + "/" + IMAGE_NAME + SEPERATOR + to4Digits(j));
      }
    }

    //"https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js"
    this.load.setPath("");
    this.load.plugin("rexpinchplugin", "plugin.js", true);
  }

  create() {
    let dragScale = this.plugins.get("rexpinchplugin").add(this);
    let separator = PAGE_BOTTOM_MARGIN;
    let height;
    let camera = this.cameras.main;
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
      separator += IMAGE_HEIGHT + PAGE_BOTTOM_MARGIN;
    }
    height = separator - PAGE_BOTTOM_MARGIN * PAGES;

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

    /*
    let downTime = 0;
    this.input.on("pointerdown", (pointer) => {
    if (pointer.time - downTime < 200) {
        downTime = 0;
        camera.scrollX = 0;

        if (camera.scrollY > height) {
        camera.scrollY = height;
        }
        if (camera.scrollY < 0) {
        camera.scrollY = 0;
        }
    } else {
        downTime = pointer.time;
    }
    });
    */
  }
}

const config = {
  type: Phaser.AUTO,
  title: "A CookBook of Stories",
  scene: [Main],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
};

const game = new Phaser.Game(config);
