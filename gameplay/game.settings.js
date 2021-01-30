import constant from '../constant.js'

function resetGamePlay() {
    return {
        delayGeneral: 1000,
        level: 1,
        score: 0,
        gameOver: false,
        gameStart: false,
        pause: 0,
        pauseByMessage: 0,
        stepTutorial: -1,
        initialCountdown: 0,
        mathProblemExist: false,
        status: constant.statusGame.STOP,
        dificulty: 0,
        dificultyLevel: 0,
        data: null,
        gameCountdownBase: 10000
    }
}

export {
    resetGamePlay
}