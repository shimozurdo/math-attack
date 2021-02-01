import constant from "../constant.js"

function getValuesProblem(dificulty) {
    if (dificulty === constant.dificulty.EASY) {
        let value1 = Phaser.Math.Between(1, 10)
        let value2 = Phaser.Math.Between(1, 10)
        let allowValuesRepeted = false
        let allowValuesRepetedRan
        if (value1 === value2) {
            allowValuesRepetedRan = Phaser.Math.Between(1, 2)
            allowValuesRepeted = allowValuesRepetedRan === 1 ? true : false
        }
        if (!allowValuesRepeted)
            do {
                value2 = Phaser.Math.Between(1, 10)
            } while (value1 === value2)
        let operator = getOperatorNumber(dificulty)
        if (operator.symbol === "-") {
            do {
                value2 = Phaser.Math.Between(1, value1)
            } while (value2 > value1)
        }
        return { value1, value2, operator }
    } else if (dificulty === constant.dificulty.NORMAL) {
        let operator = getOperatorNumber(dificulty)
        if (operator.symbol !== "x") {
            operator = getOperatorNumber(dificulty)
        }
        let value1, value2
        if (operator.symbol === "x") {
            value1 = Phaser.Math.Between(1, 10)
            value2 = Phaser.Math.Between(0, 10)
            let changePosValuesRan = Phaser.Math.Between(1, 2)
            if (changePosValuesRan === 1) {
                let value1Aux = value1
                value1 = value2
                value2 = value1Aux
            }
        } else {
            value1 = Phaser.Math.Between(1, 15)
            value2 = Phaser.Math.Between(1, 10)
            let allowValuesRepeted = false
            let allowValuesRepetedRan
            if (value1 === value2) {
                allowValuesRepetedRan = Phaser.Math.Between(1, 2)
                allowValuesRepeted = allowValuesRepetedRan === 1 ? true : false
            }
            if (!allowValuesRepeted)
                do {
                    value2 = Phaser.Math.Between(1, 10)
                } while (value1 === value2)

            if (operator.symbol === "-") {
                do {
                    value2 = Phaser.Math.Between(1, value1)
                } while (value2 > value1)
            }
        }
        return { value1, value2, operator }
    }
}

function getOperatorNumber(dificulty) {
    let operator = {}
    if (dificulty === constant.dificulty.EASY) {
        operator.id = Phaser.Math.Between(1, 2)
        operator.symbol = getOperatorStr(operator.id)
    } else if (dificulty === constant.dificulty.NORMAL) {
        operator.id = Phaser.Math.Between(1, 3)
        operator.symbol = getOperatorStr(operator.id)
    }
    return operator
}

function getOperatorStr(operatorId) {
    let operatorSymbol = ""
    switch (operatorId) {
        case 1:
            operatorSymbol = "+"
            break
        case 2:
            operatorSymbol = "-"
            break
        case 3:
            operatorSymbol = "x"
            break
        case 4:
            operatorSymbol = "/"
            break
    }
    return operatorSymbol
}

function getResults(values, dificulty) {
    let results = {}
    if (values.operator.symbol === "+") { results.solution = values.value1 + values.value2 }
    if (values.operator.symbol === '-') { results.solution = values.value1 - values.value2 }
    if (values.operator.symbol === 'x') { results.solution = values.value1 * values.value2 }
    if (values.operator.symbol === '/') { results.solution = values.value1 / values.value2 }
    let otherResultList = []
    if (dificulty === constant.dificulty.EASY) {
        const resultCloseToSolutionIndex = Phaser.Math.Between(1, 3)
        let it = 0
        for (let i = 0; i < 3; i++) {
            let otherResultExist = false
            let otherResult
            do {
                it++
                if (it > 1000)
                    debugger
                if (resultCloseToSolutionIndex === i) {
                    let resultCloseToSolutionFirstIndex = results.solution - Phaser.Math.Between(1, 5)
                    let resultCloseToSolutionLastIndex = results.solution + Phaser.Math.Between(1, 5)
                    otherResult = Phaser.Math.Between(resultCloseToSolutionFirstIndex, resultCloseToSolutionLastIndex)
                    otherResultExist = otherResultList.includes(otherResult)

                    if (!otherResultExist) {
                        if (otherResult < 0)
                            otherResult = 0
                        otherResultList[i] = otherResult
                    }
                } else {
                    if (values.operator.symbol === "+") {
                        let sumValues = values.value1 + values.value2
                        otherResult = Phaser.Math.Between(0, sumValues * 2)
                    } else if (values.operator.symbol === "-")
                        otherResult = Phaser.Math.Between(0, (values.value1 + values.value2) * 2)

                    otherResultExist = otherResultList.includes(otherResult)

                    if (!otherResultExist)
                        otherResultList[i] = otherResult
                }
            } while (otherResultList[i] === results.solution || otherResultExist)
        }
        results.otherResultList = otherResultList
    } else if (dificulty === constant.dificulty.NORMAL) {
        const resultCloseToSolutionIndex = Phaser.Math.Between(1, 3)
        let it = 0
        for (let i = 0; i < 3; i++) {
            let otherResultExist = false
            let otherResult
            do {
                it++
                if (it > 1000)
                    debugger
                if (resultCloseToSolutionIndex === i) {
                    let resultCloseToSolutionFirstIndex = results.solution - Phaser.Math.Between(1, 5)
                    let resultCloseToSolutionLastIndex = results.solution + Phaser.Math.Between(1, 5)
                    otherResult = Phaser.Math.Between(resultCloseToSolutionFirstIndex, resultCloseToSolutionLastIndex)
                    otherResultExist = otherResultList.includes(otherResult)

                    if (!otherResultExist) {
                        if (otherResult < 0)
                            otherResult = 0
                        otherResultList[i] = otherResult
                    }
                } else {
                    if (values.operator.symbol === "+") {
                        let sumValues = values.value1 + values.value2
                        otherResult = Phaser.Math.Between(0, sumValues * 2)
                    } else if (values.operator.symbol === "-")
                        otherResult = Phaser.Math.Between(0, (values.value1 + values.value2) * 2)
                    else if (values.operator.symbol === "x") {
                        let otherResultRan = Phaser.Math.Between(1, 2)
                        if (otherResultRan === 1)
                            otherResult = Phaser.Math.Between(0, (values.value1 * values.value2) + 5)
                        else
                            otherResult = Phaser.Math.Between(0, (values.value1 * values.value2))
                    }

                    otherResultExist = otherResultList.includes(otherResult)
                    if (otherResultExist && otherResult === 0) {
                        otherResult = Phaser.Math.Between(0, ((values.value1 > 0 ? values.value1 : 1) * (values.value2 > 0 ? values.value2 : 10)))
                        otherResultExist = false;
                    }

                    if (!otherResultExist)
                        otherResultList[i] = otherResult
                }
            } while (otherResultList[i] === results.solution || otherResultExist)
        }
        results.otherResultList = otherResultList
    }

    return results
}

export {
    getValuesProblem,
    getOperatorNumber,
    getOperatorStr,
    getResults
}