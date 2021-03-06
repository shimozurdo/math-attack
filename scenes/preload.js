import constant from '../constant.js'
import { createAnimation } from '../utils/common.js'

export default class Preload extends Phaser.Scene {

    // Vars
    handlerScene = null
    sceneStopped = false

    constructor() {
        super({ key: 'preload' })
    }

    preload() {
        // Images
        this.load.image('logo', 'assets/images/logo.png')
        this.load.image('game-logo', 'assets/images/game-logo.png')
        this.load.image('guide', 'assets/images/960x540-guide.png')
        this.load.image('button', 'assets/images/button.png')
        this.load.image('button1', 'assets/images/button1.png')
        this.load.image('button-square', 'assets/images/button-square.png')
        this.load.image('counterclockwide-arrow', 'assets/images/counterclockwide-arrow.png')
        this.load.image('numbers', 'assets/images/numbers.png')
        this.load.image('bar-countdown', 'assets/images/bar-countdown.png')
        this.load.image('bar-countdown-frame', 'assets/images/bar-countdown-frame.png')
        this.load.image('reload', 'assets/images/reload.png')
        this.load.image('background', 'assets/images/background.png')
        this.load.image('background2', 'assets/images/background2.png')
        this.load.image('background3', 'assets/images/background3.png')
        this.load.image('lock', 'assets/images/lock.png')
        // Sprite sheets
        this.load.spritesheet('rocket', 'assets/images/rocket.png', { frameWidth: 124, frameHeight: 200 });
        //---------------------------------------------------------------------->
        this.canvasWidth = this.sys.game.canvas.width
        this.canvasHeight = this.sys.game.canvas.height

        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height

        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'preload'
        this.sceneStopped = false

        let progressBox = this.add.graphics()
        progressBox.fillStyle(0x000, 0.8)
        progressBox.fillRect((this.canvasWidth / 2) - (210 / 2), (this.canvasHeight / 2) - 5, 210, 30)
        let progressBar = this.add.graphics()

        this.load.on('progress', (value) => {
            progressBar.clear()
            progressBar.fillStyle(0xFF5758, 1)
            progressBar.fillRect((this.canvasWidth / 2) - (200 / 2), (this.canvasHeight / 2), 200 * value, 20)
        })

        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()
            this.time.addEvent({
                delay: this.game.debugMode ? 3000 : 4000,
                callback: () => {
                    const hubScene = this.scene.get('hub')
                    hubScene.prepareFadeOutBg()
                    this.sceneStopped = true
                    this.scene.stop('preload')
                    this.handlerScene.cameras.main.setBackgroundColor(constant.color.TITLE)
                    this.handlerScene.launchScene('title')
                },
                loop: false
            })
        })

        //binding actions to this scene
        this.createAnimation = createAnimation.bind(this);
    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        // CONFIG SCENE 

        // GAME OBJECTS  
        this.add.image(width / 2, (height / 2), 'logo').setOrigin(.5)
        // GAME OBJECTS          

        // ANIMATIONS       
        this.createAnimation(constant.ANIM.FLY + '-rocket', 'rocket', 0, 2, 10, -1);
        // ANIMATIONS  
    }
}
