import _ from 'lodash';
import './../static/styles.css';

import TetrisGame from './tetris';
import TetrisRender from './tetris-render';
import TetrisBoard from './tetris-board';
import TetrisScore from './tetris-score';


const canvas = document.getElementById('tetris-canvas');
    canvas.width = 300;
    canvas.height = 600;
    canvas.style.margin = 'auto';
    canvas.style.display = 'block';


const ctx = canvas.getContext('2d');
const rows = 20;
const cols = 10;
const cellSize = 30;

const render = new TetrisRender(canvas, ctx, cellSize);
const scoreboard = new TetrisScore();
const board = new TetrisBoard(rows, cols, canvas, ctx, cellSize, render, scoreboard);
const game = new TetrisGame(rows, cols, canvas, ctx, cellSize, board, render, scoreboard );


const startButton = document.getElementById('start-button');    

startButton.addEventListener('click', () => {
    game.start();
    startButton.disabled = true;
});

const pauseButton = document.getElementById('pause-button');

// pauseButton.addEventListener('click', () => {
//     game.pause();
//     startButton.disabled = false;
// })

const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', () => {
    game.restart();
    startButton.disabled = true;
});


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            game.moveLeft();
            game.update();
            break;
        case 'ArrowRight':
            game.moveRight();
            game.update();
            break;
        case 'ArrowDown':
            event.preventDefault();
            game.moveDown();
            game.update();
            break;
        case ' ':
            event.preventDefault();
            game.moveBottom();
            game.update();
            break;
        case 'ArrowUp':
            event.preventDefault();
            game.rotate();
            game.update()
            break;
        default:
            break;
}
}
);


const leftButton = document.getElementById('left-button');
leftButton.addEventListener('click', () => {
    game.moveLeft();
    game.update();
});

const rightButton = document.getElementById('right-button');

rightButton.addEventListener('click', () => {

    game.moveRight();
    game.update();
}   
);

const downButton = document.getElementById('down-button');  

downButton.addEventListener('click', () => {
    game.moveDown();
    game.update();
}   
);

const bottomButton = document.getElementById('drop-button');

bottomButton.addEventListener('click', () => {
    game.moveBottom();
    game.update();
}
);


const rotateButton = document.getElementById('rotate-button');

rotateButton.addEventListener('click', () => {
    game.rotate();
    game.update();
}
);
