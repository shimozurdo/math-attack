import constant from "../constant.js"

// UPDATE GAME PLAY
function generateMathProblem() {
    const value1 = Phaser.Math.Between(1, 100);
    const value2 = Phaser.Math.Between(1, 100);
    const operator = Phaser.Math.Between(1, 4);
    console.log(operator)
    let operatorStr = "";
    switch (operator) {
        case 1:
            operatorStr = "+";
            break;
        case 2:
            operatorStr = "-";
            break;
        case 3:
            operatorStr = "x";
            break;
        case 4:
            operatorStr = "/";
            break;
    }
    let operators = {
        '+': function (a, b) { return a + b },
        '-': function (a, b) { return a - b },
        'x': function (a, b) { return a * b },
        '/': function (a, b) { return a / b }
    }

    let result = operators[operatorStr](value1, value2);
    this.mathProblemTxt.setText(value1 + operatorStr + value2 + "= ?");

    const solutionRandomButton = Phaser.Math.Between(1, 4);
    this.resultTxtGroup.children.each(function (child) {
        if (solutionRandomButton === parseInt(child.name.split("-")[1]))
            child.setText(result);
        else
            child.setText(Phaser.Math.Between(1, value1 + value2));
    });

    this.gamePlay.mathProblemExist = true;
}
// UPDATE GAME PLAY

// ACTIONS
function resetGamePlay() {
    return {
        delayGeneral: 1000,
        level: 1,
        score: 0,
        gameOver: false,
        gameStart: false,
        pause: 0,
        initialCountdown: 2000,
        mathProblemExist: false,
        state: constant.state.STOP
    }
}
// ACTIONS
export {
    resetGamePlay,
    generateMathProblem
}