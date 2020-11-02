/**
 * Registers pointerover event from a game object
 * @param {GameObject} [gameObjet]
 */
function pointerOver(gameObjet) {
    gameObjet.on('pointerover', function () {
        this.setTint(0xff0000);
    });
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
 * Registers pointerup event from a game object and calls to the anonymous function sen
 *
 * @param {Anonymous function} [res=() => { }]
 */
function pointerBack(res = () => { }) {
    const backBtn = this.add.image(50, 50, 'back').setInteractive({ cursor: 'pointer' });
    pointerOver(backBtn);
    pointerOut(backBtn);
    backBtn.on('pointerup', () => {
        res();
    });
}

export {
    pointerOver,
    pointerOut,
    pointerBack
}