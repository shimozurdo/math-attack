import constant from '../constant.js'
import { createAnimation } from '../utils/common.js'

export default class Preload extends Phaser.Scene {

    width = null
    height = null
    handlerScene = null
    sceneStopped = false

    constructor() {
        super({ key: 'preload' })
    }

    preload() {
        // Images
        this.load.image('logo', 'assets/images/logo.png')
        this.load.image('guide', 'assets/images/640x960-guide.png')
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
        // Fonts
        this.load.bitmapFont('atarismooth', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml')
        //---------------------------------------------------------------------->
        this.canvasWidth = this.sys.game.canvas.width
        this.canvasHeight = this.sys.game.canvas.height

        this.handlerScene = this.scene.get('handler')

        let progressBox = this.add.graphics()
        progressBox.fillStyle(0x000, 0.8)
        progressBox.fillRect((this.canvasWidth / 2) - (210 / 2), (this.canvasHeight / 2) - 5, 210, 30)
        let progressBar = this.add.graphics()

        this.load.on('progress', (value) => {
            progressBar.clear()
            progressBar.fillStyle(0xFF5758, 1)
            progressBar.fillRect((this.canvasWidth / 2) - (200 / 2), (this.canvasHeight / 2), 200 * value, 20)
        })

        // this.load.on('fileprogress', (file) => {
        //     if (file.key === 'logo')
        //         this.rocket = this.add.image(this.canvasWidth / 2, (this.canvasHeight / 2) - 100, 'rocket').setOrigin(.5).setScale(.7)
        // })

        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()
            this.time.addEvent({
                delay: this.game.debugMode ? 3000 : 4000,
                callback: () => {
                    this.sceneStopped = true
                    this.scene.stop('preload')
                    this.handlerScene.cameras.main.setBackgroundColor(constant.color.TITLE)
                    this.handlerScene.launchScene('title')
                },
                loop: false
            })
        })

        //binding actions to thins scene
        this.createAnimation = createAnimation.bind(this);
    }

    create() {
        //this.rocket.visible = false
        this.add.image(this.game.screenSize.width / 2, (this.game.screenSize.height / 2), 'logo').setOrigin(.5)
        // HANDLER SCENE
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        this.scale.on('resize', this.resize, this)

        const scaleWidth = this.scale.gameSize.width
        const scaleHeight = this.scale.gameSize.height

        this.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight)
        this.sizer = new Phaser.Structs.Size(this.game.screenSize.width, this.game.screenSize.height, Phaser.Structs.Size.FIT, this.parent)

        this.parent.setSize(scaleWidth, scaleHeight)
        this.sizer.setSize(scaleWidth, scaleHeight)
        this.updateCamera()
        // HANDLER SCENE

        // ANIMATIONS       
        this.createAnimation(constant.ANIM.FLY + '-rocket', 'rocket', 0, 2, 10, -1);
        // ANIMATIONS  
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
        camera.setViewport(x, y, this.sizer.width, this.sizer.height)
        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(this.game.screenSize.width / 2, this.game.screenSize.height / 2)
        this.handlerScene.updateCamera()
    }

    getZoom() {
        return this.cameras.main.zoom
    }
}
