import constant from "../constant.js"
import { stringToHex } from "../utils/colors.js"
import { pointerUp, pointerOver } from "../utils/buttons.js"

export default class Game extends Phaser.Scene {

    // Vars
    width = null;
    height = null;
    handlerScene = false;
    sceneStopped = false;
    dificulty = null;

    constructor() {
        super({ key: "game" })
    }

    init(data) {
        this.dificulty = data.dificulty;
        console.log(this.dificulty);
    }

    preload() {
        this.sceneStopped = false;
        this.width = this.game.screenSize.width;
        this.height = this.game.screenSize.height;
        this.handlerScene = this.scene.get("handler");
        this.handlerScene.sceneRunning = "game";
        // Bindings
        this.pointerUp = pointerUp.bind(this);
    }

    create() {
        // HANDLER SCENE
        this.add.image(0, 0, "guide").setOrigin(0).setDepth(1);
        this.scale.on("resize", this.resize, this);

        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.width, this.height, Phaser.Structs.Size.FIT, this.parent);

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();
        // HANDLER SCENE

        // BACKGROUND  
        this.n1Btn = this.add.image(this.width / 4, this.height - 300, "button-square").setOrigin(.5).setInteractive({ cursor: "pointer" });
        this.n1Btn.setScale(.8);
        this.n2Btn = this.add.image(this.width - (this.width / 4), this.height - 300, "button-square").setOrigin(.5).setInteractive({ cursor: "pointer" });
        this.n2Btn.setScale(.8);
        this.n3Btn = this.add.image(this.width / 4, this.height - 120, "button-square").setOrigin(.5).setInteractive({ cursor: "pointer" });
        this.n3Btn.setScale(.8);
        this.n4Btn = this.add.image(this.width - (this.width / 4), this.height - 120, "button-square").setOrigin(.5).setInteractive({ cursor: "pointer" });
        this.n4Btn.setScale(.8);
        // BACKGROUND 
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
