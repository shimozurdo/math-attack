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
        this.gameLogoIsOnCenter = false;
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

        this.gameLogoImg = this.add.image(width / 2, (height / 3) - 800, 'game-logo').setOrigin(.5)

        this.playBtn = this.add.image(width / 2, ((height / 2) + 180) - 800, 'button1').setOrigin(.5).setInteractive({ cursor: 'pointer' })
        this.playTxt = this.add.text(width / 2, ((height / 2) + 180) - 800, 'PLAY', { fontFamily: 'Open Sans', fontSize: '50px' }).setOrigin(.5)

        this.pointerUp(() => {
            this.flashElement(this.playBtn, () => {
                this.sceneStopped = true
                this.scene.stop('title')
                this.handlerScene.cameras.main.setBackgroundColor(constant.color.MENU)
                this.game.mainAnimationWasShown = true
                this.handlerScene.launchScene('menu')
            });
        }, this.playBtn)

        pointerOver(this.playBtn)

        this.creditsTxt = this.add.text(width / 2, (height / 2) + 300, 'Credits', { fontFamily: 'Open Sans', fontSize: '20px', color: '#FFFFFF', }).setOrigin(.5).setInteractive({ cursor: 'pointer' })
        this.creditsTxt.visible = false
        this.pointerUp(() => {
            this.sceneStopped = true
            this.scene.stop('title')
            this.game.mainAnimationWasShown = true
            this.handlerScene.launchScene('credits')
        }, this.creditsTxt)

        pointerOver(this.creditsTxt)
        // BACKGROUND 

        // GAME OBJECTS  
        if (this.game.mainAnimationWasShown) {
            this.gameLogoImg.y += 800
            this.playTxt.y += 800
            this.playBtn.y += 800
            this.creditsTxt.visible = true
        } else {
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
        }
        // GAME OBJECTS          
    }

    update(t, dt) {
        if (!this.game.mainAnimationWasShown) {
            if (this.gameLogoImg.y < (this.height / 3)) {
                this.gameLogoImg.y += dt * .3
                this.playTxt.y += dt * .3
                this.playBtn.y += dt * .3
            } else {
                this.rocket.y -= dt * .7
                this.creditsTxt.visible = true
            }
        }
        if (this.gameLogoImg.y >= (this.height / 3) && !this.gameLogoIsOnCenter) {
            this.gameLogoIsOnCenter = true
            this.tweens.add({
                targets: this.gameLogoImg,
                props: {
                    y: { value: "+=10", duration: 2000, ease: "Sine.easeInOut" },
                },
                ease: "Linear",
                duration: 2000,
                repeat: -1,
                yoyo: true
            })
        }
    }
}
