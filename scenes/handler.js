export default class Handler extends Phaser.Scene {

    constructor() {
        super("handler");
    }

    create() {
        this.cameras.main.setBackgroundColor("#000");
        this.launchScene("preload");
        this.launchScene("hud");
    }

    launchScene(_scene) {
        this.scene.launch(_scene);
        this.gameScene = this.scene.get(_scene);
    }

    updateCamera() {
        const camera = this.cameras.main;
        const zoom = this.gameScene.getZoom();
        camera.setZoom(zoom);
        camera.centerOn(this.game.screenSize.maxHeight / 2, this.game.screenSize.minHeight / 2);
    }

}