// tetris.js

// This file contains the TetrisGame class, which is responsible for managing the game state.

export default class TetrisGame {
    constructor(rows, cols, canvas, ctx, cellSize, board, render, scoreboard) {
        this.board = board;
        this.render = render
        this.interval = null;
        this.scoreboard = scoreboard;
    }

    async start() {
        this.hideStartOverlay();
        await this.countdown();
        this.board.start();
    }

    async countdown() {
        const countdownElement = document.getElementById('countdown');

        const parent = this.render.canvas.parentElement;

        countdownElement.textContent = '3';
        parent.classList.add('countdown');
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        countdownElement.textContent = '2';
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        }   );
        countdownElement.textContent = '1'; 
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        parent.classList.remove('countdown');
    }


    pause() {
        this.board.stop();
    }

    stop() {
        this.board.stop();
        //this.board.reset();
        //this.scoreboard.reset();
        //this.render.clear();
    }

    moveLeft() {
        if (this.board.canMoveLeft()) {

        this.board.movePieceLeft();
        }
    }

    restart() {
        this.board.reset();
        this.scoreboard.reset();
        this.board.canvas.parentElement.classList.remove('game-over');
        this.start();
    }

    moveRight() {
        if (this.board.canMoveRight()) {
            this.board.movePieceRight();
            return
        }
    }

    moveDown() {
        if (this.board.canMoveDown(this.board.piece)) {
            this.board.movePieceDown();
        }
    }

    moveBottom() {
        this.board.moveToBottom();
    }

    rotate() {
        this.board.rotatePiece();
    }

    update(){
        this.board.renderBoard();
    }

    // logic to display overlays

    showPauseOverlay() {
        // add the class .paused to the parent of the canvas element
        const parent = this.render.canvas.parentElement;
        parent.classList.add('paused');
    }

    hidePauseOverlay() {
        const parent = this.render.canvas.parentElement;
        parent.classList.remove('paused');

    }

    showGameOverOverlay() {
        const parent = this.render.canvas.parentElement;
        parent.classList.add('game-over');
    }

    hideGameOverOverlay() {
        const parent = this.render.canvas.parentElement;
        parent.classList.remove('game-over');
    }

    showStartOverlay() {
        const  parent = this.render.canvas.parentElement;
        parent.classList.add('start');

    }

    hideStartOverlay() {
        const parent = this.render.canvas.parentElement;
        parent.classList.remove('start');
    }
}

