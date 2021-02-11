import constant from '../constant.js'
import { stringToHex } from '../utils/colors.js'
import * as action from '../gameplay/countdown.math.js'
import * as setting from '../gameplay/game.settings.js'
import { pointerUp } from '../utils/buttons.js'
import { pointerOver } from '../utils/buttons.js'
import { ruleOfThree } from '../utils/common.js'

export default class Game extends Phaser.Scene {

    // Vars
    width = null
    height = null
    handlerScene = false
    sceneStopped = false
    dificulty = null
    resultBtnGroup = null
    resultTxtGroup = null
    messageGameTxt = null
    mathProblemTxt = null

    constructor() {
        super({ key: 'game' })
    }

    init(data) {
        this.dificulty = data.dificulty
    }

    preload() {
        // Bindings
        this.pointerUp = pointerUp.bind(this)
        this.generateMathProblem = action.generateMathProblem.bind(this)
        this.lose = action.lose.bind(this)

        // Scene config
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'game'

        // Game config
        this.gamePlay = setting.resetGamePlay()
        this.gamePlay.dificulty = this.dificulty
        if (this.gamePlay.dificulty === constant.dificulty.EASY)
            this.gamePlay.gameCountdownBase = 15000
        else
            this.gamePlay.gameCountdownBase = 10000
    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        // CONFIG SCENE 

        // GAME OBJECTS  
        this.add.image(width / 2, height / 2, "background2").setOrigin(.5)
        this.resultTxtGroup = this.add.group()
        this.resultBtnGroup = this.add.group()
        this.messageGameTxt = this.add.bitmapText(width / 2, height / 2, 'atarismooth', 'GET READY!', 50).setOrigin(.5)
        this.mathProblemTxt = this.add.bitmapText(width / 2, (height / 4) + 60, 'atarismooth', '', 50).setOrigin(.5)
        this.add.bitmapText(width / 2, 30, 'atarismooth', 'Score', 25).setOrigin(.5)
        this.scoreTxt = this.add.bitmapText(width / 2, 60, 'atarismooth', '0', 28).setOrigin(.5)

        this.barWBase = 320
        this.barTs = this.add.tileSprite(width / 4, 150, this.barWBase, 56, 'bar-countdown').setOrigin(0)
        this.barTsFrame = this.add.image(width / 4, 150, 'bar-countdown-frame').setOrigin(0)
        this.barTs.visible = false
        this.barTsFrame.visible = false

        let posX = width / 4
        let posXplus = 0
        let posY = height
        let posYplus = 400

        for (let i = 0; i < 4; i++) {
            if (i === 1 || i === 3)
                posXplus = width / 2
            else if (i === 2)
                posXplus = 0
            if (i > 1)
                posYplus = 220

            let resultBtn = this.add.image(posX + posXplus + (i % 2 ? -30 : 30), posY - posYplus, 'button-square').setOrigin(.5).setInteractive({ cursor: 'pointer' })
            resultBtn.setScale(.8, .8)
            resultBtn.name = 'resultBtn-' + (i + 1)
            resultBtn.visible = false
            pointerOver(resultBtn)
            this.resultBtnGroup.add(resultBtn)

            let resultTxt = this.add.bitmapText(posX + posXplus + (i % 2 ? -30 : 30), posY - posYplus, 'atarismooth', '', 40).setOrigin(.5)
            resultTxt.name = 'resultTxt-' + (i + 1)
            resultTxt.setTint(stringToHex(constant.color.GAME))
            resultTxt.visible = false
            this.resultTxtGroup.add(resultTxt)
        }

        this.input.on('gameobjectdown', (pointer, child) => {
            if (!this.gamePlay.gameOver) {
                const resultTxt = this.resultTxtGroup.getChildren().find(v => v.name === 'resultTxt-' + child.name.split('-')[1])
                if (resultTxt) {
                    if (action.chooseSolution.call(this, resultTxt.text)) {
                        this.gamePlay.mathProblemExist = false
                        this.gamePlay.score += 100
                        this.scoreTxt.setText(this.gamePlay.score)
                    } else
                        this.lose()
                }
            }
        })
        // GAME OBJECTS

        // START GAME
        this.time.addEvent({
            delay: this.gamePlay.delayGeneral,
            callback: () => {
                this.gamePlay.gameStart = true
                this.gamePlay.status = constant.statusGame.STARTING
            },
            loop: false
        })
        // START GAME
    }

    update(time, delta) {
        if (!this.gamePlay.gameOver && this.gamePlay.gameStart) {
            if (this.gamePlay.status == constant.statusGame.STARTING && this.gamePlay.initialCountdown >= 1000) {
                this.gamePlay.initialCountdown -= delta
                this.messageGameTxt.setText(parseInt((this.gamePlay.initialCountdown / 1000)))
                return
            }
            else if (this.gamePlay.status == constant.statusGame.STARTING && this.gamePlay.initialCountdown < 1000) {
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.gamePlay.initialCountdown = 0
                        this.messageGameTxt.setText('')
                        this.gamePlay.status = constant.statusGame.RUNNING
                        this.resultBtnGroup.children.each(function (child) {
                            child.visible = true
                        })
                        this.resultTxtGroup.children.each(function (child) {
                            child.visible = true
                        })
                    },
                    loop: false
                })
            }

            // loop game
            if (this.gamePlay.status == constant.statusGame.RUNNING && !this.gamePlay.mathProblemExist) {
                this.generateMathProblem()
                // increase dificulty                
                this.gamePlay.dificultyLevel += 1
                this.gameCountdown = this.gamePlay.gameCountdownBase
                // increase dificulty
                // if (this.gamePlay.dificultyLevel < 70)
                //     this.barTs.setTint("0x00FF00")
                // else if (this.gamePlay.dificultyLevel >= 70 && this.gamePlay.dificultyLevel < 120)
                //     this.barTs.clearTint()
                // else
                //     this.barTs.setTint("0xDC143C")

                this.barTs.width = this.barWBase
                this.barTs.visible = true
                this.barTsFrame.visible = true
            }

            // game countdown
            if (this.gamePlay.status === constant.statusGame.RUNNING && this.gamePlay.mathProblemExist) {
                this.barTs.width = ruleOfThree(this.barWBase, this.gameCountdown, this.gamePlay.gameCountdownBase)
                this.gameCountdown -= delta + (delta * (this.gamePlay.dificultyLevel / 100))
                //console.log(delta + (delta * (this.gamePlay.dificultyLevel / 100)))
                if (this.gameCountdown <= 0) {
                    this.barTs.width = 0
                    this.barTs.visible = false
                    this.lose()
                }
            }
        }
    }
}
