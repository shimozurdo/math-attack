import constant from "../constant.js";

export default class Preload extends Phaser.Scene {

    width = null;
    height = null;
    handlerScene = null;
    sceneStopped = false;

    constructor() {
        super({ key: "preload" });
    }

    preload() {
        // Fonts
        this.load.bitmapFont("atarismooth", "assets/fonts/atari-smooth.png", "assets/fonts/atari-smooth.xml");
        // Images
        this.load.image("logo", "assets/images/logo.png");
        this.load.image("guide", "assets/images/640x960-guide.png");
        this.load.image("button", "assets/images/button.png");
        this.load.image("button-square", "assets/images/button-square.png");
        this.load.image("counterclockwide-arrow", "assets/images/counterclockwide-arrow.png");
        //---------------------------------------------------------------------->
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;

        this.handlerScene = this.scene.get("handler");

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((this.width / 2) - (320 / 2), (this.height / 2) - (50 / 2), 320, 50);

        let loadingText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 50,
            text: "Loading...",
            style: {
                font: "28px monospace",
                fill: "#ffffff"
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 5,
            text: "0%",
            style: {
                font: "28px monospace",
                fill: "#ffffff"
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 + 50,
            text: "",
            style: {
                font: "18px monospace",
                fill: "#ffffff"
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on("progress", (value) => {
            percentText.setText(parseInt(value * 100) + "%");
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((this.width / 2) - (300 / 2), (this.height / 2) - (30 / 2), 300 * value, 30);
        });

        this.load.on("fileprogress", (file) => {
            assetText.setText("Loading asset: " + file.key);
        });

        this.load.on("complete", () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.sceneStopped = true;
                    this.scene.stop("preload");
                    this.handlerScene.cameras.main.setBackgroundColor(constant.color.TITLE);
                    this.handlerScene.launchScene("title");
                },
                loop: false
            });
        });
    }

    create() {
        this.add.image(this.game.screenSize.width / 2, this.game.screenSize.height / 2, "logo").setOrigin(.5);
        this.add.image(0, 0, "guide").setOrigin(0).setDepth(1);
        this.scale.on("resize", this.resize, this);
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;
        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.game.screenSize.width, this.game.screenSize.height, Phaser.Structs.Size.FIT, this.parent);
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        this.updateCamera();
    }

    resize(gameSize) {
        if (!this.sceneStopped) {
            const width = gameSize.width;
            const height = gameSize.height;
            this.parent.setSize(width, height);
            this.sizer.setSize(width, height);
            this.updateCamera();
        }
    }

    updateCamera() {
        const camera = this.cameras.main;
        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = Math.ceil((this.parent.height - this.sizer.height) * 0.5);
        const scaleX = this.sizer.width / this.game.screenSize.width;
        const scaleY = this.sizer.height / this.game.screenSize.height;
        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(this.game.screenSize.width / 2, this.game.screenSize.height / 2);
        this.handlerScene.updateCamera();
    }

    getZoom() {
        return this.cameras.main.zoom;
    }
}
