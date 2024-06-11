// tetris-board.js

// This file contains the TetrisBoard class, which represents the game board for Tetris.

import TetrisPiece from './tetris-piece.js';

export default class TetrisBoard {
    constructor(rows, cols, canvas, ctx, cellSize, render, scoreboard) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.createBoard();
        this.piece = this.createPiece();
        this.canvas = canvas;
        this.ctx = ctx;
        this.cellSize = cellSize;
        this.render = render;
        this.scoreboard = scoreboard;
        this.interval = null;
        this.speed = 1000;
        this.hasStarted = false;
    }

    createBoard() {
        const board = [];
        for (let row = 0; row < this.rows; row++) {
            board.push(new Array(this.cols).fill(0));
        }
        return board;
    }

    createPiece() {
        const shapes = [
            [[1, 1, 1],
            [0, 1, 0]],

            [[0, 2, 2],
            [2, 2, 0]],

            [[3, 3],
            [3, 3]],

            [[4, 4, 4, 4]],
            [[0, 0, 5],
            [5, 5, 5]],
            [[6, 0],
            [6, 6],
            [0, 6]],
            [[7, 7],
            [7, 7]],
            [[8, 8, 0],
        [0, 8, 8],],
        [[9, 0, 0],
        [9, 9, 9]]
        ];
        // pick feminine colors, a list of pastel colors and its darker shades
        // const colors = [
        //     ["#FFC0CB", "#FF69B4"],
        //     ["#FFA07A", "#CD5C5C"],
        //     ["#FFD700", "#FF8C00"],
        //     ["#ADFF2F", "#32CD32"],
        //     ["#00FFFF", "#00CED1"],
        //     ["#4682B4", "#0000CD"],
        //     ["#EE82EE", "#8A2BE2"]
        // ]

        const colors = [
    [
        "#ADD8E6", // Light Blue
        "#0000FF", // Primary Blue
        "#0000CD", // Medium Blue
        "#00008B"  // Dark Blue
    ],
    [
        "#E6E6FA", // Lavender
        "#800080", // Primary Purple
        "#4B0082", // Medium Purple
        "#301934"  // Dark Purple
    ],
    [
        "#FFB6C1", // Light Pink
        "#FF69B4", // Primary Hot Pink
        "#FF1493", // Deep Pink
        "#C71585"  // Dark Pink
    ],
    [
        "#FFFFE0", // Light Yellow
        "#FFFF00", // Primary Yellow
        "#FFD700", // Gold
        "#B8860B"  // Dark Goldenrod
    ],
    [
        "#CCFFCC", // Light Lime
        "#32CD32", // Primary Lime Green
        "#228B22", // Forest Green
        "#006400"  // Dark Green
    ]
];

        const shapeIndex = Math.floor(Math.random() * shapes.length);
        const colorIndex = Math.floor(Math.random() * colors.length);

        return new TetrisPiece(shapes[shapeIndex], colors[colorIndex]);


    }

    start() {

        this.hasStarted = true;
        this.interval = setInterval(() => {
            this.update();
            this.renderBoard();
            this.speed = 1000 * Math.pow(0.85, this.scoreboard.getLevel());
        }, this.speed);
    }

    stop() {

        this.hasStarted = false;
        clearInterval(this.interval);
        this.interval = null;
    }

    changeInterval() {
        clearInterval(this.interval);
        this.start();
    }

    update() {
        if (this.canMoveDown(this.piece)) {
            this.movePieceDown();
            this.render.drawPhantom(this.getPhantomPiece());
        } else {
            if (this.isGameOver()) {
                this.stop();
                const mainContainer = this.canvas.parentElement;
                mainContainer.classList.add('game-over');
                return
            }
            this.lockPiece();
            this.clearLines();
            this.piece = this.createPiece();

        }
    }

    getPhantomPiece() {
        const phantomPiece = this.piece.copy();
        while (this.canMoveDown(phantomPiece)) {
            phantomPiece.row++;

        }

        return phantomPiece;

    }
    isGameOver() { 
        return this.board[0].some(cell => cell !== 0);
    }

    reset() { 
        this.stop();
        this.board = this.createBoard();
        this.scoreboard.reset();
        this.piece = this.createPiece();
        // update the render
        this.renderBoard();
    }

    movePieceDown() {
        this.piece.row++;
        this.scoreboard.addScore(10);
    }


    movePieceLeft() {
        if (this.canMoveLeft()) {
            this.piece.col--;
        }
    }

    movePieceRight() {
        if (this.canMoveRight()) {
            this.piece.col++;
        }
    }

    moveToBottom() {
        while (this.canMoveDown(this.piece)) {
            this.movePieceDown();
        }
    }

    rotatePiece() {
        const newShape = this.piece.rotateShape();
        if (this.canRotate(newShape)) {
            this.piece.setShape(newShape);
        }
    }

    canRotate(shape) {
        const row = this.piece.row;
        const col = this.piece.col;

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] !== 0) {
                    const nextRow = row + i;
                    const nextCol = col + j;

                    if (nextRow < 0 || nextRow >= this.rows || nextCol < 0 || nextCol >= this.cols || this.board[nextRow][nextCol] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    canMoveDown(piece) {
        return this.isValidMove(1, 0, piece);
    }

    canMoveLeft() {
        return this.isValidMove(0, -1, this.piece);
    }

    canMoveRight() {
        return this.isValidMove(0, 1, this.piece);
    }

    isValidMove(offsetRow = 0, offsetCol = 0, piece) {
        const shape = piece.getShape();
        const row = piece.row + offsetRow;
        const col = piece.col + offsetCol;

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] !== 0) {
                    const nextRow = row + i;
                    const nextCol = col + j;

                    if (nextRow < 0 || nextRow >= this.rows || nextCol < 0 || nextCol >= this.cols || this.board[nextRow][nextCol] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    lockPiece() {
        const shape = this.piece.getShape();
        const row = this.piece.row;
        const col = this.piece.col;
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] !== 0) {
                    this.board[row + i][col + j] = this.piece.getColor();
                }
            }
        }
    }

    clearLines() {
        let lines = 0;
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.isLineFull(row)) {
                this.clearLine(row);
                lines++;
                row++;
            }
        }

        this.scoreboard.addLines(lines);
        this.changeInterval();
        let points =  Math.pow(2, lines - 1) * 100;
        this.scoreboard.addScore(points);
    }

    isLineFull(row) {
        return this.board[row].every(cell => cell !== 0);
    }


    clearLine(row) {
        this.board.splice(row, 1);
        this.board.unshift(new Array(this.cols).fill(0));
    }

    renderBoard() {
        // canvas clear
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        if (this.hasStarted) {

        this.render.drawPhantom(this.getPhantomPiece());
        // render board
        this.renderPiece();
        }

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col] !== 0) {
                    this.render.drawCell(row, col, this.board[row][col]);
                }
            }
        }
    }

    renderPiece() {
        this.render.drawPiece(this.piece);
    }

}
