import constant from '../constant.js'
import { stringToHex } from '../utils/colors.js'
import { pointerUp, pointerOver } from '../utils/buttons.js'

export default class Menu extends Phaser.Scene {

    // Vars
    handlerScene = false
    sceneStopped = false

    constructor() {
        super({ key: 'menu' })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'menu'
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

        // GAME OBJECTS  
        this.add.image(width / 2, height / 2, 'background2').setOrigin(.5)
        this.add.image(width / 2, height / 2, 'background3').setOrigin(.5).alpha = .2
        let currentScore = parseInt(localStorage.getItem('score')) || 0
        this.add.text(this.width / 2, 20, 'Max Score : ' + currentScore, { fontFamily: 'Open Sans', fontSize: '28px', align: 'center' }).setOrigin(.5)

        this.dificultyBtnGrp = this.add.group()
        this.dificultyTxtGrp = this.add.group()
        this.gameTitleTxt = this.add.text(width / 2, height / 5, 'Choose a math\nchallenge', { fontFamily: 'Open Sans', fontSize: '40px', align: 'center' }).setOrigin(.5)
        this.countDownGameBtn = this.add.image(width / 2, height / 2, 'button-square').setOrigin(.5).setInteractive({ cursor: 'pointer' })
        this.countDownGame = this.add.image(width / 2, height / 2, 'numbers').setOrigin(.5)
        this.countDownGame.setTint(stringToHex(constant.color.MENU))
        pointerOver(this.countDownGameBtn)
        this.pointerUp(() => {
            this.countDownGameBtn.setVisible(false)
            this.gameTitleTxt.setText('Dificulty')

            let posY = height / 2 - 100
            let configDificultyButtonList = [
                { text: 'Easy', dificulty: constant.dificulty.EASY },
                { text: 'Normal', dificulty: constant.dificulty.NORMAL },
                { text: 'Hard', dificulty: constant.dificulty.HARD }
            ]
            for (let i = 0; i < configDificultyButtonList.length; i++) {

                let dificultyBtn = this.add.image(width / 2, posY, 'button1').setOrigin(.5)
                if (configDificultyButtonList[i].dificulty != constant.dificulty.HARD) {
                    dificultyBtn.setInteractive({ cursor: 'pointer' })
                    this.pointerUp(() => {
                        this.startGame(configDificultyButtonList[i].dificulty)
                        //this.startGame(0)
                    }, dificultyBtn)
                    pointerOver(dificultyBtn)
                }
                if (i !== 1)
                    dificultyBtn.setScale(.8)
                else
                    dificultyBtn.setScale(1, .8)
                this.dificultyBtnGrp.add(dificultyBtn)

                let dificultyTxt = this.add.text(this.width / 2, posY, configDificultyButtonList[i].text, { fontFamily: 'Open Sans', fontSize: '40px' }).setOrigin(.5)

                this.dificultyTxtGrp.add(dificultyTxt)
                posY += 150
                if (configDificultyButtonList[i].dificulty === constant.dificulty.HARD)
                    this.add.image(dificultyBtn.x, dificultyBtn.y, 'lock').setOrigin(.5)
            }

        }, this.countDownGameBtn)
        // GAME OBJECTS 
    }

    startGame(dificulty) {
        this.sceneStopped = true
        this.scene.stop('menu')
        this.handlerScene.cameras.main.setBackgroundColor(constant.color.GAME)
        this.handlerScene.launchScene('game', { dificulty })
    }
}
