import { pointerUp } from '../utils/buttons.js'

export default class Credits extends Phaser.Scene {

    // Vars
    width = null
    height = null
    handlerScene = false
    sceneStopped = false

    constructor() {
        super({ key: 'credits' })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'credits'
        // Bindings
        this.pointerUp = pointerUp.bind(this)
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

        this.add.text(width / 2, height / 2, 'Code: Shimozurdo', { fontFamily: 'Open Sans', fontSize: '30px', align: 'center' }).setOrigin(.5)
        this.add.text(width / 2, (height / 2) + 32, 'Art: Onda', { fontFamily: 'Open Sans', fontSize: '30px', align: 'center' }).setOrigin(.5)
        // BACKGROUND         
    }

}
