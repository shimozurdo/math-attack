import { fullScreen } from "../utils/screen.js"
import { pointerUp } from "../utils/buttons.js"
import constant from "../constant.js"

export default class Hub extends Phaser.Scene {
    // Vars
    soundBtn = null
    music = null
    handlerScene = null
    constructor() {
        super("hub")
    }

    preload() {
        // Images
        this.load.image("quit", "assets/images/quit.png")
        this.load.spritesheet("fullscreen", "assets/images/fullscreen.png", { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet("sound", "assets/images/sound.png", { frameWidth: 48, frameHeight: 48 })
        // Audio
        this.load.audio("pleasant-creek-loop", ["assets/audio/pleasant-creek-loop.mp3", "assets/audio/pleasant-creek-loop.ogg"])
        //---------------------------------------------------------------------->
        this.canvasWidth = this.sys.game.canvas.width
        this.canvasHeight = this.sys.game.canvas.height
        this.handlerScene = this.scene.get("handler")
        //Orientation
        this.scale.lockOrientation(constant.ORIENTATION)

        // Bindings        
        this.pointerUp = pointerUp.bind(this)
        if (!this.game.embedded)
            fullScreen.call(this)
        this.creditsTxt = this.add.text(this.canvasWidth / 2, this.canvasHeight - 22, 'Shimozurdo Games 2021', { fontFamily: 'Arial', fontSize: '18px', color: '#000', }).setOrigin(.5).setDepth(1)
    }

    create() {
        this.music = this.sound.add("pleasant-creek-loop", {
            volume: .3,
            loop: true,
        })

        let posItemHubBase = 32
        this.quitBtn = this.add.image(posItemHubBase, posItemHubBase, "quit").setOrigin(.5).setDepth(1).setInteractive({ cursor: "pointer" })
        this.quitBtn.visible = false

        this.pointerUp(() => {
            this.clickBackScene(this.handlerScene.sceneRunning)
        }, this.quitBtn)

        let multiplePosY = this.game.embedded ? 1 : 3
        this.soundBtn = this.add.image(this.canvasWidth - posItemHubBase, posItemHubBase * multiplePosY, "sound").setOrigin(.5).setDepth(1).setInteractive({ cursor: "pointer" })
        this.soundBtn.visible = false

        if (this.game.debugMode) {
            this.music.pause()
            this.soundBtn.setFrame(1)
        } else {
            this.music.play()
            this.soundBtn.setFrame(0)
        }

        this.soundBtn.on("pointerup", () => {
            if (this.music.isPlaying) {
                this.soundBtn.setFrame(1)
                this.music.pause()
            }
            else {
                this.soundBtn.setFrame(0)
                this.music.resume()
            }
        })

        if (!this.game.embedded) {
            multiplePosY = this.game.embedded ? 3 : 1
            this.fullscreenBtn = this.add.image(this.canvasWidth - posItemHubBase, posItemHubBase * multiplePosY, "fullscreen", 0).setOrigin(.5).setDepth(1).setInteractive({ cursor: "pointer" })

            this.fullscreenBtn.on("pointerup", () => {
                if (this.scale.isFullscreen) {
                    this.fullscreenBtn.setFrame(0)
                    this.scale.stopFullscreen()
                }
                else {
                    this.fullscreenBtn.setFrame(1)
                    this.scale.startFullscreen()
                }
            })
        }        
        this.scale.on("resize", this.resize, this)
    }

    update() {
        if (this.handlerScene.sceneRunning === 'title') {
            this.soundBtn.visible = true
            this.quitBtn.visible = false
            this.creditsTxt.visible = false
        } else if (this.handlerScene.sceneRunning === 'menu') {
            this.quitBtn.visible = true
        }
    }

    clickBackScene(sceneTxt) {
        const scene = this.scene.get(sceneTxt)
        let gotoScene
        let bgColorScene
        switch (sceneTxt) {
            case "title":
                this.creditsTxt.visible = false
                return
            case "menu":
                gotoScene = "title"
                bgColorScene = constant.color.TITLE
                break
            case "game":
                gotoScene = "menu"
                bgColorScene = constant.color.MENU
                break
        }
        scene.sceneStopped = true
        scene.scene.stop(sceneTxt)
        this.handlerScene.cameras.main.setBackgroundColor(bgColorScene)
        this.handlerScene.launchScene(gotoScene)
    }

    resize() {
        if (!this.game.embedded)
            this.fullscreenBtn.x = this.scale.gameSize.width - 30
        this.soundBtn.x = this.scale.gameSize.width - 30
        this.creditsTxt.x = this.scale.gameSize.width / 2
        this.creditsTxt.y = this.scale.gameSize.height - 30
    }

    getZoom() {
        return this.cameras.main.zoom
    }

}