export default class Handler extends Phaser.Scene {

    // Vars
    sceneRunning = null;
    constructor() {
        super("handler");
    }

    create() {
        this.cameras.main.setBackgroundColor("#000");
        this.launchScene("preload");
        this.launchScene("hub");
    }

    launchScene(scene) {
        this.scene.launch(scene);
        this.gameScene = this.scene.get(scene);
    }

    updateCamera() {
        const camera = this.cameras.main;
        const zoom = this.gameScene.getZoom();
        camera.setZoom(zoom);
        camera.centerOn(this.game.screenSize.maxHeight / 2, this.game.screenSize.minHeight / 2);
    }

}