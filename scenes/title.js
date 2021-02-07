import { pointerOver, pointerUp } from '../utils/buttons.js'
import { flashElement } from '../utils/common.js'
import constant from '../constant.js'

export default class Title extends Phaser.Scene {

    // Vars
    width = null
    height = null
    handlerScene = false
    sceneStopped = false

    constructor() {
        super({ key: 'title' })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenSize.width
        this.height = this.game.screenSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'title'
        // Bindings
        this.pointerUp = pointerUp.bind(this)
        this.flashElement = flashElement.bind(this)
    }

    create() {
        const { width, height } = this
        // HANDLER SCENE
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        this.scale.on('resize', this.resize, this)

        const scaleWidth = this.scale.gameSize.width
        const scaleHeight = this.scale.gameSize.height

        this.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight)
        this.sizer = new Phaser.Structs.Size(width, height, Phaser.Structs.Size.FIT, this.parent)

        this.parent.setSize(scaleWidth, scaleHeight)
        this.sizer.setSize(scaleWidth, scaleHeight)

        this.updateCamera()
        // HANDLER SCENE

        // BACKGROUND
        this.bgImage = this.add.image(width / 2, height / 2, 'background2').setOrigin(.5)
        this.bgImage.alpha = .5
        this.gameTitleTxt = this.add.bitmapText(width / 2, (height / 3) - 800, 'atarismooth', 'MATH\nATTACK', 55, 1).setOrigin(.5)
        this.playBtn = this.add.image(this.width / 2, ((this.height / 2) + 200) - 800, 'button1').setOrigin(.5).setInteractive({ cursor: 'pointer' })

        this.pointerUp(() => {
            this.flashElement(this.playBtn, () => {
                this.sceneStopped = true
                this.scene.stop('title')
                this.handlerScene.cameras.main.setBackgroundColor(constant.color.MENU)
                this.handlerScene.launchScene('menu')
            });
        }, this.playBtn)

        pointerOver(this.playBtn)
        // BACKGROUND 
        // ACTORS
        this.rocket = this.add.sprite((width / 2) - 10, height - 20, 'rocket').setOrigin(.5, 1)
        this.rocket.anims.play(constant.ANIM.FLY + '-rocket')
        this.tweens.add({
            targets: this.rocket,
            alpha: { from: .2, to: 1 },
            props: {
                x: { value: '+=20', duration: 1000, ease: 'Linear' },
            },
            ease: 'Linear',
            duration: 2000,
            repeat: -1,
            yoyo: true
        })
        // ACTORS
    }

    update(t, dt) {
        if (this.gameTitleTxt.y < (this.width / 3)) {
            this.gameTitleTxt.y += dt * .3
            this.playBtn.y += dt * .3
        } else {
            this.rocket.y -= dt * .7
        }
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
