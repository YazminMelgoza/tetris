// tetris-main.js

// This file contains the main game loop for the Tetris game.

const TetrisBoard = require('./tetris-board');
const TetrisInput = require('./tetris-input');
const TetrisRender = require('./tetris-render');


alert("tetris-main.js");
const canvas = document.getElementById('tetris-canvas');
const ctx = canvas.getContext('2d');

const rows = 20;
const cols = 10;
const cellSize = 30;

const game = new TetrisBoard(rows, cols, canvas, ctx, cellSize);
const input = new TetrisInput(game);
const render = new TetrisRender(canvas, ctx, cellSize);

document.addEventListener('keydown', (event) => {
    input.handleInput(event);
}   );

game.start();



// In the tetris-main.js file, we import the TetrisBoard, TetrisInput, and TetrisRender classes from their respective files. We create a canvas element and get its 2d context. We define the number of rows, columns, and cell size for the game. We create a new TetrisBoard object, TetrisInput object, and TetrisRender object. We add an event listener for keydown events that calls the handleInput method on the TetrisInput object. Finally, we call the start method on the TetrisBoard object to start the game loop.