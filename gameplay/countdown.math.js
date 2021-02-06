import * as logic from "../logic/countdown.math.logic.js"

// UPDATE GAME PLAY
function generateMathProblem() {

    let valuesProblem = logic.getValuesProblem(this.gamePlay.dificulty)

    let results = logic.getResults(valuesProblem, this.gamePlay.dificulty)

    this.mathProblemTxt.setText(valuesProblem.value1 + valuesProblem.operator.symbol + valuesProblem.value2 + "= ?")

    const solutionRandomBtnIndex = Phaser.Math.Between(1, 4)
    let index = 0
    this.resultTxtGroup.children.each(function (child) {
        if (solutionRandomBtnIndex === parseInt(child.name.split("-")[1])) {
            child.setText(results.solution)
            // console.log(results.solution, "s")
        } else {
            child.setText(results.otherResultList[index])
            // console.log(results.otherResultList[index])
            index++
        }
        // console.log(index, "-")
    })

    this.gamePlay.mathProblemExist = true
    this.gamePlay.data = results
}

function chooseSolution(solution) {
    if (this.gamePlay.data.solution === parseInt(solution)) {
        return true
    } else {
        let currentScore = parseInt(localStorage.getItem('score')) || 0
        if (this.gamePlay.score > currentScore) {
            localStorage.setItem('score', this.gamePlay.score)
            this.add.bitmapText(this.width / 2, (this.height / 2) + 90, "atarismooth", "New Max Score: " + this.gamePlay.score, 25, 1).setOrigin(.5)
        }
        return false
    }
}

function lose() {
    this.messageGameTxt.setTint("0xff0000")
    this.messageGameTxt.setText("You lose!")
    this.gamePlay.gameOver = true
    this.resultBtnGroup.setVisible(false)
    this.resultTxtGroup.setVisible(false)
    let mathProblemTxt = this.mathProblemTxt.text.replace("?", "")
    this.mathProblemTxt.setText(mathProblemTxt + this.gamePlay.data.solution)
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            this.reloadBtn = this.add.image(this.width / 2, (this.height / 2) + 220, "reload").setOrigin(.5).setInteractive({ cursor: "pointer" })
            this.pointerUp(() => {
                this.registry.destroy()
                this.events.off()
                this.scene.restart()
            }, this.reloadBtn)
        },
        loop: false
    })
}
// UPDATE GAME PLAY

export {
    generateMathProblem,
    chooseSolution,
    lose
}