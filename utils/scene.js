// SCENE ACTIONS
function createAnimation(_key, _texture, _start, _end, _frameRate, _repeat, _yoyo) {
    this.anims.create({
        key: _key,
        frames: this.anims.generateFrameNumbers(_texture, { start: _start, end: _end }),
        frameRate: _frameRate,
        repeat: _repeat,
        yoyo: _yoyo
    });
}
// SCENE ACTIONS

export {
    createAnimation
}