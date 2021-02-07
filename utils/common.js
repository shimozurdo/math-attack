// x1 ---- t1
// ?  ---- t2
function ruleOfThree(x1, t2, t1) {
    const x2 = (x1 * t2) / t1
    return x2
}

function createAnimation(key, texture, start, end, frameRate, repeat, yoyo) {
    this.anims.create({
        key: key,
        frames: this.anims.generateFrameNumbers(texture, { start: start, end: end }),
        frameRate: frameRate,
        repeat: repeat,
        yoyo: yoyo
    });
}

function flashElement(element, callback, alpha = .5, duration = 40, easing = 'Linear', repeat = 10) {
    this.tweens.timeline({
        targets: element,
        ease: easing,       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: duration,
        loop: repeat,
        onComplete: () => {
            callback()
        },
        tweens: [
            {
                targets: element,
                alpha: alpha,
            },
            {
                targets: element,
                alpha: 1,
            }
        ]
    });
}


export {
    ruleOfThree,
    createAnimation,
    flashElement
}