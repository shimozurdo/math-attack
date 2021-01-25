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
    if (this.gamePlay.data.solution === parseInt(solution))
        return true
    else
        return false
}

function lose() {
    this.messageGameTxt.setTint("0xff0000");
    this.messageGameTxt.setText("You lose!")
    this.gamePlay.gameOver = true
    this.resultBtnGroup.setVisible(false)
    this.resultTxtGroup.setVisible(false)
    this.reloadBtn = this.add.image(this.width / 2, (this.height / 2) + 200, "reload").setOrigin(.5).setInteractive({ cursor: "pointer" })
    this.pointerUp(() => {
        this.registry.destroy();
        this.events.off();
        this.scene.restart();
    }, this.reloadBtn)
}
// UPDATE GAME PLAY

export {
    generateMathProblem,
    chooseSolution,
    lose
}