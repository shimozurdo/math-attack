import constant from "../constant.js"
import { stringToHex } from "../utils/colors.js"
import { pointerUp, pointerOver } from "../utils/buttons.js"

export default class Menu extends Phaser.Scene {

    // Vars
    width = null;
    height = null;
    handlerScene = false;
    sceneStopped = false;

    constructor() {
        super({ key: "menu" })
    }

    preload() {
        this.sceneStopped = false;
        this.width = this.game.screenSize.width;
        this.height = this.game.screenSize.height;
        this.handlerScene = this.scene.get("handler");
        this.handlerScene.sceneRunning = "menu";
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
        this.gameTitleTxt = this.add.bitmapText(this.width / 2, this.height / 5, "atarismooth", "Choose a math\nchallenge", 30, 1).setOrigin(.5);
        this.countDownGameBtn = this.add.image(this.width / 2, this.height / 2, "button-square").setOrigin(.5).setInteractive({ cursor: "pointer" });
        this.countDownGame = this.add.image(this.width / 2, this.height / 2, "counterclockwide-arrow").setOrigin(.5);
        this.countDownGame.setTint(stringToHex(constant.color.MENU));
        pointerOver(this.countDownGameBtn);
        this.pointerUp(() => {
            // it will improve
            this.countDownGameBtn.setVisible(false);
            this.gameTitleTxt.setText("Dificulty");
            this.easyBtn = this.add.image(this.width / 2, this.height / 2 - 100, "button").setOrigin(.5).setInteractive({ cursor: "pointer" });
            this.pointerUp(() => {
                this.startGame(constant.dificulty.EASY);
            }, this.easyBtn);
            this.easyTxt = this.add.bitmapText(this.width / 2, this.height / 2 - 100, "atarismooth", "Easy", 40).setOrigin(.5);
            this.easyTxt.setTint(stringToHex(constant.color.MENU));
            pointerOver(this.easyBtn);
            this.easyBtn.setScale(.8);

            this.normalBtn = this.add.image(this.width / 2, this.height / 2 + 50, "button").setOrigin(.5).setInteractive({ cursor: "pointer" });
            this.pointerUp(() => {
                this.startGame(constant.dificulty.NORMAL);
            }, this.normalBtn);
            this.normalTxt = this.add.bitmapText(this.width / 2, this.height / 2 + 50, "atarismooth", "Normal", 40).setOrigin(.5);
            this.normalTxt.setTint(stringToHex(constant.color.MENU));
            pointerOver(this.normalBtn);
            this.normalBtn.setScale(1, .8);

            this.hardBtn = this.add.image(this.width / 2, this.height / 2 + 200, "button").setOrigin(.5).setInteractive({ cursor: "pointer" });
            this.pointerUp(() => {
                this.startGame(constant.dificulty.HARD);
            }, this.hardBtn);
            this.hardTxt = this.add.bitmapText(this.width / 2, this.height / 2 + 200, "atarismooth", "Hard", 40).setOrigin(.5);
            this.hardTxt.setTint(stringToHex(constant.color.MENU));
            pointerOver(this.hardBtn);
            this.hardBtn.setScale(.8);

        }, this.countDownGameBtn);
        // BACKGROUND 
    }

    startGame(dificulty) {
        this.sceneStopped = true;
        this.scene.stop("menu");
        this.handlerScene.cameras.main.setBackgroundColor(constant.color.GAME);
        this.handlerScene.launchScene("game", { dificulty });
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
