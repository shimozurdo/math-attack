
/**
 * Configures fullscreen in a scene
 */
function fullScreen() {
    this.scale.fullscreenTarget = document.getElementById("game");
    let F11Key = this.input.keyboard.addKey('F11');
    F11Key.on('down', () => {
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
            console.log("Stop fullscreen");
        }
        else {
            this.scale.startFullscreen();
            console.log("Start fullscreen");
        }
    });

    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    function exitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            console.log("Catch key escape event");
        }
    }
}

export {
    fullScreen
}