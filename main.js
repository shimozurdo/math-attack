import Handler from "./scenes/handler.js"
import Title from "./scenes/title.js"
import Preload from "./scenes/preload.js"
import Hud from "./scenes/hud.js";

const maxSizeWidthScreen = 1920;
const maxSizeHeightScreen = 1080;
const minSizeWidthScreen = 320;
const minSizeHeightScreen = 480;
const sizeWidthScreen = 640;
const sizeHeightScreen = 960;

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: "game",
        width: sizeWidthScreen,
        height: sizeHeightScreen,
        min: {
            width: minSizeWidthScreen,
            height: minSizeHeightScreen
        },
        max: {
            width: maxSizeWidthScreen,
            height: maxSizeHeightScreen
        }
    },
    dom: {
        createContainer: true
    },
    scene: [Handler, Preload, Title, Hud],
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
};

const game = new Phaser.Game(config);

game.screenSize = {
    maxWidth: maxSizeWidthScreen,
    minHeight: maxSizeHeightScreen,
    minWidth: minSizeWidthScreen,
    maxHeight: minSizeHeightScreen,
    width: sizeWidthScreen,
    height: sizeHeightScreen
}

