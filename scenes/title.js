import { pointerOver, pointerUp } from "../utils/buttons.js"
import constant from "../constant.js"
import { stringToHex } from "../utils/colors.js"

export default class Title extends Phaser.Scene {

    // Vars
    width = null
    height = null
    handlerScene = false
    sceneStopped = false

    constructor() {
        super({ key: "title" })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenSize.width
        this.height = this.game.screenSize.height
        this.handlerScene = this.scene.get("handler")
        this.handlerScene.sceneRunning = "title"
        // Bindings
        this.pointerUp = pointerUp.bind(this)
    }

    create() {
        // HANDLER SCENE
        if (this.game.debugMode)
            this.add.image(0, 0, "guide").setOrigin(0).setDepth(1)
        this.scale.on("resize", this.resize, this)

        const width = this.scale.gameSize.width
        const height = this.scale.gameSize.height

        this.parent = new Phaser.Structs.Size(width, height)
        this.sizer = new Phaser.Structs.Size(this.width, this.height, Phaser.Structs.Size.FIT, this.parent)

        this.parent.setSize(width, height)
        this.sizer.setSize(width, height)

        this.updateCamera()
        // HANDLER SCENE

        // BACKGROUND AND HUB
        this.add.image(this.width / 2, this.height / 2, "background").setOrigin(.5)
        this.gameTitleTxt = this.add.bitmapText(this.width / 2, this.height / 3, "atarismooth", "MATH ATTACK", 55).setOrigin(.5)

        this.tweens.add({
            targets: this.gameTitleTxt,
            alpha: { from: .2, to: 1 },
            props: {
                y: { value: "+=10", duration: 2000, ease: "Sine.easeInOut" },
            },
            ease: "Linear",
            duration: 2000,
            repeat: -1,
            yoyo: true
        })
        this.playBtn = this.add.image(this.width / 2, this.height / 2 + 30, "button1").setOrigin(.5).setInteractive({ cursor: "pointer" })
        this.pointerUp(() => {
            this.sceneStopped = true
            this.scene.stop("title")
            this.handlerScene.cameras.main.setBackgroundColor(constant.color.MENU)
            this.handlerScene.launchScene("menu")
        }, this.playBtn)
        // this.playTxt = this.add.bitmapText(this.width / 2, this.height / 2 + 30, "atarismooth", "PLAY", 40).setOrigin(.5)
        // this.playTxt.setTint(stringToHex(constant.color.TITLE))
        pointerOver(this.playBtn)
        // BACKGROUND AND HUB
    }

    resize(gameSize) {
        if (!this.sceneStopped) {
            const width = gameSize.width
            const height = gameSize.height

            this.parent.setSize(width, height)
            this.sizer.setSize(width, height)

            this.updateCamera()
        }
    }

    updateCamera() {
        const camera = this.cameras.main

        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5)
        const y = Math.ceil((this.parent.height - this.sizer.height) * 0.5)
        const scaleX = this.sizer.width / this.game.screenSize.width
        const scaleY = this.sizer.height / this.game.screenSize.height

        //camera.setViewport(x, y, this.sizer.width, this.sizer.height)
        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(this.game.screenSize.width / 2, this.game.screenSize.height / 2)
        this.handlerScene.updateCamera()
    }

    getZoom() {
        return this.cameras.main.zoom
    }
}
