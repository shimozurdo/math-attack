import { fullScreen } from "../utils/screen.js";
import { pointerOver, pointerOut } from "../utils/buttons.js";

export default class Title extends Phaser.Scene {

    // Vars
    width = null;
    height = null;
    handlerScene = false;
    sceneStopped = false;

    constructor() {
        super({ key: "title" })
    }

    preload() {
        this.width = this.game.screenSize.width;
        this.height = this.game.screenSize.height;
        this.handlerScene = this.scene.get("handler");

        // Bindings
        fullScreen.call(this);
    }

    create() {
        this.add.image(0, 0, "guide").setOrigin(0).setDepth(1);
        this.scale.on("resize", this.resize, this);

        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.game.screenSize.width, this.game.screenSize.height, Phaser.Structs.Size.FIT, this.parent);

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();

        // BACKGROUND AND HUD
        this.add.bitmapText(this.game.screenSize.width / 2, this.game.screenSize.height / 2, "atarismooth", "SHIMOZURDO GAMES", 30).setOrigin(.5);
        // BACKGROUND AND HUD
    }

    resize(gameSize) {
        if (!this.sceneStopped) {
            const width = gameSize.width;
            const height = gameSize.height;

            this.parent.setSize(width, height);
            this.sizer.setSize(width, height);

            this.updateCamera();
        }
    }

    updateCamera() {
        const camera = this.cameras.main;

        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = Math.ceil((this.parent.height - this.sizer.height) * 0.5);
        const scaleX = this.sizer.width / this.game.screenSize.width;
        const scaleY = this.sizer.height / this.game.screenSize.height;

        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(this.game.screenSize.width / 2, this.game.screenSize.height / 2);
        this.handlerScene.updateCamera();
    }

    getZoom() {
        return this.cameras.main.zoom;
    }
}
