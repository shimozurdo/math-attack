import constant from "../constant.js"

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
        status: constant.statusGame.STOP,
        dificulty: 0,
        data: null
    }
}

export {
    resetGamePlay
}