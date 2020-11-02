/**
 * Registers pointerover event from a game object
 * @param {GameObject} [gameObjet]
 */
function pointerOver(gameObjet, hex = 0xEFF0F1) {
    gameObjet.on('pointerover', function () {
        this.setTint(hex);
    });
    pointerOut(gameObjet);
}

/**
 * Registers pointerout event from a game object
 * @param {GameObject} [gameObjet]
 */
function pointerOut(gameObjet) {
    gameObjet.on('pointerout', function () {
        this.clearTint();
    });
}

/**
 * Registers pointerup event from a game object and calls to the anonymous function sent it
 *
 * @param {*} [res=() => { }]
 * @param {*} gameObjet
 */
function pointerUp(res = () => { }, gameObjet) {
    gameObjet.on('pointerup', () => {
        res();
    });
}

export {
    pointerOver,
    pointerOut,
    pointerUp
}