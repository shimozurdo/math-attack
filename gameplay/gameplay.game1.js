import constant from "../constant.js"

// UPDATE GAME PLAY
function generateMathProblem() {

    let valuesProblem = getValuesProblem(this.gamePlay.dificulty);

    let results = getResults(valuesProblem, this.gamePlay.dificulty);
    this.mathProblemTxt.setText(valuesProblem.value1 + valuesProblem.operator.symbol + valuesProblem.value2 + "= ?");

    const solutionRandomBtnIndex = Phaser.Math.Between(1, 4);
    let index = 0;
    this.resultTxtGroup.children.each(function (child) {
        if (solutionRandomBtnIndex === parseInt(child.name.split("-")[1])) {
            child.setText(results.solution);
            console.log(results.solution, "s")
        } else {
            child.setText(results.otherResultList[index]);
            console.log(results.otherResultList[index])
            index++;
        }
        console.log(index, "-")
    });

    this.gamePlay.mathProblemExist = true;
    this.gamePlay.data = results;
}

function chooseSolution(solution) {
    if (this.gamePlay.data.solution === parseInt(solution))
        return true;
    else
        return false;
}

function getValuesProblem(dificulty) {
    if (dificulty === constant.dificulty.EASY) {
        let value1 = Phaser.Math.Between(1, 10);
        let value2 = Phaser.Math.Between(1, 10);
        let operator = getOperatorNumber(dificulty);
        if (operator.id === 2) {
            do {
                value2 = Phaser.Math.Between(1, value1);
            } while (value2 > value1);
        }
        return { value1, value2, operator };
    }
}

function getOperatorNumber(dificulty) {
    let operator = {};
    if (dificulty === constant.dificulty.EASY) {
        operator.id = Phaser.Math.Between(1, 2);
        operator.symbol = getOperatorStr(operator.id);
    }
    return operator;
}

function getOperatorStr(operatorId) {
    let operatorSymbol = "";
    switch (operatorId) {
        case 1:
            operatorSymbol = "+";
            break;
        case 2:
            operatorSymbol = "-";
            break;
        case 3:
            operatorSymbol = "x";
            break;
        case 4:
            operatorSymbol = "/";
            break;
    }
    return operatorSymbol;
}

function getResults(values, dificulty) {
    let results = {};
    if (values.operator.symbol === "+") { results.solution = values.value1 + values.value2 }
    if (values.operator.symbol === '-') { results.solution = values.value1 - values.value2 }
    if (values.operator.symbol === 'x') { results.solution = values.value1 * values.value2 }
    if (values.operator.symbol === '/') { results.solution = values.value1 / values.value2 }
    let otherResultList = [];
    if (dificulty === constant.dificulty.EASY) {
        const resultCloseToSolutionIndex = Phaser.Math.Between(1, 3);

        for (let i = 0; i < 3; i++) {
            let otherResultExist = false;
            let otherResult;
            do {
                if (resultCloseToSolutionIndex === i) {

                    let resultCloseToSolutionFirstIndex = results.solution - Phaser.Math.Between(1, 5);
                    let resultCloseToSolutionLastIndex = results.solution + Phaser.Math.Between(1, 5);
                    otherResult = Phaser.Math.Between(resultCloseToSolutionFirstIndex, resultCloseToSolutionLastIndex);
                    otherResultExist = otherResultList.includes(otherResult);

                    if (!otherResultExist) {
                        if (otherResult < 0)
                            otherResult = 0;
                        otherResultList[i] = otherResult;
                    }

                } else {

                    if (values.operator.symbol === "+") {
                        let sumValues = values.value1 + values.value2;
                        otherResult = Phaser.Math.Between(0, sumValues * 2);
                    } else if (values.operator.symbol === "-")
                        otherResult = Phaser.Math.Between(0, values.value1 + values.value2);

                    otherResultExist = otherResultList.includes(otherResult);

                    if (!otherResultExist)
                        otherResultList[i] = otherResult;
                }
            } while (otherResultList[i] === results.solution || otherResultExist);
        }
        results.otherResultList = otherResultList;
        // console.log(results.otherResultList);
    }
    return results;
}
// UPDATE GAME PLAY

// CONFIG
function resetGamePlay() {
    return {
        delayGeneral: 1000,
        level: 1,
        score: 0,
        gameOver: false,
        gameStart: false,
        pause: 0,
        initialCountdown: 1000,
        mathProblemExist: false,
        statusGame: constant.statusGame.STOP,
        dificulty: 0,
        data: null
    }
}
// CONFIG
export {
    resetGamePlay,
    generateMathProblem,
    chooseSolution
}