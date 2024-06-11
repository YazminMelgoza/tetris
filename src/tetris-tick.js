// tetris-tick.js

// This file contains the TetrisTick class, which is responsible for updating the game state.

export default class TetrisTick {
    constructor() {
    }

    start() {
        this.interval = setInterval(() => {
            this.game.update();
        }, this.speed);
    }

    stop() {
        clearInterval(this.interval);
    }
}

