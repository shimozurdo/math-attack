export default class Handler extends Phaser.Scene {

    // Vars
    sceneRunning = null;

    constructor() {
        super("handler");
    }

    create() {
        this.cameras.main.setBackgroundColor("#FFF");
        this.launchScene("preload");
        this.launchScene("hub");
    }

    launchScene(scene, data) {
        this.scene.launch(scene, data);
        this.gameScene = this.scene.get(scene);
        this.scene.moveUp('hub');
    }

    updateResize(scene) {
        scene.scale.on('resize', this.resize, scene)

        const scaleWidth = scene.scale.gameSize.width
        const scaleHeight = scene.scale.gameSize.height

        scene.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight)
        scene.sizer = new Phaser.Structs.Size(scene.width, scene.height, Phaser.Structs.Size.FIT, scene.parent)

        scene.parent.setSize(scaleWidth, scaleHeight)
        scene.sizer.setSize(scaleWidth, scaleHeight)

        this.updateCamera(scene)
    }

    resize(gameSize) {
        // 'this' means to the current scene that is running
        if (!this.sceneStopped) {
            const width = gameSize.width
            const height = gameSize.height

            this.parent.setSize(width, height)
            this.sizer.setSize(width, height)

            // updateCamera - Improve the next code
            const camera = this.cameras.main
            const scaleX = this.sizer.width / this.game.screenBaseSize.width
            const scaleY = this.sizer.height / this.game.screenBaseSize.height

            camera.setZoom(Math.max(scaleX, scaleY))
            camera.centerOn(this.game.screenBaseSize.width / 2, this.game.screenBaseSize.height / 2)
        }
    }

    updateCamera(scene) {
        const camera = scene.cameras.main
        const scaleX = scene.sizer.width / this.game.screenBaseSize.width
        const scaleY = scene.sizer.height / this.game.screenBaseSize.height

        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(this.game.screenBaseSize.width / 2, this.game.screenBaseSize.height / 2)
    }

}