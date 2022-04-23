import Phaser from "phaser";

const IMAGE_NAME = "FRAMES";
const PAGES = 5;
const PAGE_MARGIN = 0;
const FRAMES = 24;
const IMAGE_WIDTH = 1826;
const IMAGE_HEIGHT = 2000;
const FPS = 12;
const ZOOM_SENS = 0.1;

class Main extends Phaser.Scene {
  constructor() {
    super();
  }

  init() {}

  preload() {
    this.load.setPath("img/");
    for (let i = 0; i < PAGES; i++) {
      for (let j = 10; j < FRAMES + 10; j++) {
        this.load.image(i + "/" + IMAGE_NAME + "_00" + j);
      }
    }
    this.load.setPath("");

    //"https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js"
    this.load.plugin("rexpinchplugin", "plugin.js", true);
  }

  create() {
    let dragScale = this.plugins.get("rexpinchplugin").add(this);
    let separator = PAGE_MARGIN;
    let height;
    let frames = [];
    for (let i = 0; i < PAGES; i++) {
      frames[i] = [];
      for (let j = 10; j < FRAMES + 10; j++) {
        frames[i].push({ key: i + "/" + IMAGE_NAME + "_00" + j });
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

    this.cameras.main.setBounds(0, 0, IMAGE_WIDTH, separator);
    this.cameras.main.zoom = 0.3;
    this.cameras.main.scrollX = 0;
    this.cameras.main.scrollY = 0;

    /*           var isMobile = false; //initiate as false
    // device detection
    if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
    ) {
    // some code..
    isMobile = true;
    } */

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (deltaY > 0) {
        let newZoom = this.cameras.main.zoom - ZOOM_SENS;
        if (newZoom > 0.3) {
          this.cameras.main.zoom = newZoom;
        }
      }

      if (deltaY < 0) {
        let newZoom = this.cameras.main.zoom + ZOOM_SENS;
        if (newZoom < 1.3) {
          this.cameras.main.zoom = newZoom;
        }
      }
    });
    let camera = this.cameras.main;
    dragScale
      .on("drag1", function (dragScale) {
        let drag1Vector = dragScale.drag1Vector;
        camera.scrollX -= drag1Vector.x / camera.zoom;
        camera.scrollY -= drag1Vector.y / camera.zoom;
      })
      .on(
        "pinch",
        function (dragScale) {
          let scaleFactor = dragScale.scaleFactor;
          if (
            camera.zoom * scaleFactor >= 0.3 &&
            camera.zoom * scaleFactor <= 1.3
          ) {
            camera.zoom *= scaleFactor;
          }
        },
        this
      );

    /*           let downTime = 0;
    this.input.on("pointerdown", (pointer) => {
    if (pointer.time - downTime < 200) {
        downTime = 0;
        this.cameras.main.scrollX = 0;

        if (this.cameras.main.scrollY > height) {
        this.cameras.main.scrollY = height;
        }
        if (this.cameras.main.scrollY < 0) {
        this.cameras.main.scrollY = 0;
        }
    } else {
        downTime = pointer.time;
    }
    }); */
  }
}

const config = {
  type: Phaser.AUTO,
  title: "A CookBook of Stories",
  scene: [Main],
  width: IMAGE_WIDTH,
  height: IMAGE_HEIGHT,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
