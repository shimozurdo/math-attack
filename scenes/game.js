import constant from "../constant.js"
import { stringToHex } from "../utils/colors.js"
import * as action from "../gameplay/gameplay.game1.js"
import { pointerUp } from "../utils/buttons.js"
import { pointerOver } from "../utils/buttons.js"

export default class Game extends Phaser.Scene {

    // Vars
    width = null;
    height = null;
    handlerScene = false;
    sceneStopped = false;
    dificulty = null;
    resultBtnGroup = null;
    resultTxtGroup = null;
    messageGameTxt = null;
    mathProblemTxt = null;

    constructor() {
        super({ key: "game" });
    }

    init(data) {
        this.dificulty = data.dificulty;
    }

    preload() {
        // Bindings
        this.pointerUp = pointerUp.bind(this);
        this.resetGamePlay = action.resetGamePlay.bind(this);
        this.generateMathProblem = action.generateMathProblem.bind(this)

        // Scene config
        this.sceneStopped = false;
        this.width = this.game.screenSize.width;
        this.height = this.game.screenSize.height;
        this.handlerScene = this.scene.get("handler");
        this.handlerScene.sceneRunning = "game";

        // Game config
        this.gamePlay = this.resetGamePlay();
        this.gamePlay.dificulty = this.dificulty;
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

        // GAME OBJECTS  
        this.resultTxtGroup = this.add.group();
        this.resultBtnGroup = this.add.group();
        this.messageGameTxt = this.add.bitmapText(this.width / 2, this.height / 2, "atarismooth", "GET READY!", 50).setOrigin(.5);
        this.mathProblemTxt = this.add.bitmapText(this.width / 2, this.height / 4, "atarismooth", "", 50).setOrigin(.5);
        let posX = this.width / 4;
        let posXplus = 0;
        let posY = this.height;
        let posYplus = 300;

        for (let i = 0; i < 4; i++) {
            if (i === 1 || i === 3)
                posXplus = this.width / 2;
            else if (i === 2)
                posXplus = 0;
            if (i > 1)
                posYplus = 120;

            let resultBtn = this.add.image(posX + posXplus + (i % 2 ? -30 : 30), posY - posYplus, "button-square").setOrigin(.5).setInteractive({ cursor: "pointer" });
            resultBtn.setScale(1, .8);
            resultBtn.name = "resultBtn-" + (i + 1);
            resultBtn.visible = false;
            pointerOver(resultBtn);
            this.resultBtnGroup.add(resultBtn);

            let resultTxt = this.add.bitmapText(posX + posXplus + (i % 2 ? -30 : 30), posY - posYplus, "atarismooth", "", 40).setOrigin(.5);
            resultTxt.name = "resultTxt-" + (i + 1);
            resultTxt.setTint(stringToHex(constant.color.GAME));
            resultTxt.visible = false;
            this.resultTxtGroup.add(resultTxt);
        }

        this.input.on('gameobjectdown', (pointer, child) => {
            const resultTxt = this.resultTxtGroup.getChildren().find(v => v.name === "resultTxt-" + child.name.split("-")[1]);
            if (action.chooseSolution.call(this, resultTxt.text))
                this.gamePlay.mathProblemExist = false;
        });
        // GAME OBJECTS

        // START GAME
        this.time.addEvent({
            delay: this.gamePlay.delayGeneral,
            callback: () => {
                this.gamePlay.gameStart = true;
                this.gamePlay.statusGame = constant.statusGame.STARTING;
            },
            loop: false
        });
        // START GAME
    }

    update(time, delta) {
        if (!this.gamePlay.gameOver && this.gamePlay.gameStart) {
            if (this.gamePlay.statusGame == constant.statusGame.STARTING && this.gamePlay.initialCountdown >= 1000) {
                this.gamePlay.initialCountdown -= delta;
                this.messageGameTxt.setText(parseInt((this.gamePlay.initialCountdown / 1000)));
                return;
            }
            else if (this.gamePlay.statusGame == constant.statusGame.STARTING && this.gamePlay.initialCountdown < 1000) {
                this.messageGameTxt.setText("");
                this.gamePlay.statusGame = constant.statusGame.RUNNING;
                this.resultBtnGroup.children.each(function (child) {
                    child.visible = true;
                });
                this.resultTxtGroup.children.each(function (child) {
                    child.visible = true;
                });
            }
            // loop game
            if (this.gamePlay.statusGame == constant.statusGame.RUNNING && !this.gamePlay.mathProblemExist) {
                this.generateMathProblem();
            }

        }
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
