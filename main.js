import Handler from './scenes/handler.js'
import Title from './scenes/title.js'
import Preload from './scenes/preload.js'
import Hub from './scenes/hub.js'
import Menu from './scenes/menu.js'
import Game from './scenes/game.js'
import Credits from './scenes/credits.js'

// Aspect Ratio 16:9 - Portrait
const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN = 270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 540
const SIZE_HEIGHT_SCREEN = 960

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game',
        width: SIZE_WIDTH_SCREEN,
        height: SIZE_HEIGHT_SCREEN,
        min: {
            width: MIN_SIZE_WIDTH_SCREEN,
            height: MIN_SIZE_HEIGHT_SCREEN
        },
        max: {
            width: MAX_SIZE_WIDTH_SCREEN,
            height: MAX_SIZE_HEIGHT_SCREEN
        }
    },
    dom: {
        createContainer: true
    },
    scene: [Handler, Hub, Preload, Credits, Title, Menu, Game]
}

const game = new Phaser.Game(config)

// Global
game.debugMode = true
game.embedded = true // game is embedded into a html iframe/object

game.sceneTitleStarted = false
game.showfadeOutBg = false
game.mainAnimationWasShown = false

game.screenBaseSize = {
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    maxHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    minHeight: MIN_SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
}

game.orientation = "portrait"


