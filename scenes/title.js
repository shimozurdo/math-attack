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
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'title'
        // Bindings
        this.pointerUp = pointerUp.bind(this)
        this.flashElement = flashElement.bind(this)
    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        // CONFIG SCENE 

        // BACKGROUND
        this.bgImage = this.add.image(width / 2, height / 2, 'background').setOrigin(.5)
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

        // GAME OBJECTS  
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
        // GAME OBJECTS  
    }

    update(t, dt) {
        if (this.gameTitleTxt.y < (this.width / 3)) {
            this.gameTitleTxt.y += dt * .3
            this.playBtn.y += dt * .3
        } else {
            this.rocket.y -= dt * .7
        }
    }
}
