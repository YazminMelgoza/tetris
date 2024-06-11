// tetris-render.js
// This file contains the TetrisRender class, which is responsible for rendering the Tetris game.

export default class TetrisRender {
    constructor(canvas, ctx, cellSize) {
        this.ctx = ctx;
        this.cellSize = cellSize;
        this.canvas = canvas;
        this.pieces = [];
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawPiece(piece) {
        const shape = piece.getShape();
        const color = piece.getColor();
        const row = piece.row;
        const col = piece.col;
        const width = piece.getShapeWidth();
        const height = piece.getShapeHeight();

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (shape[i][j] !== 0) {
                    this.drawCell(row + i, col + j, color);
                }
            }
        }
    }

    drawCell(row, col, color) {
        const lightColor = color[0];
        const mainColor = color[1];
        const mediumColor = color[2];   
        const darkColor = color[3];

        // draw the main cell color
        this.ctx.fillStyle = mainColor;
        this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);


        const innerSquareSize = this.cellSize - 6;

        const startOfCellX = col * this.cellSize;
        const startOfCellY = row * this.cellSize;
        const endOfCellX = col * this.cellSize + this.cellSize;
        const endOfCellY = row * this.cellSize + this.cellSize;

        const startOfInnerSquareX = col * this.cellSize + 6;
        const startOfInnerSquareY = row * this.cellSize + 6;
        const endOfInnerSquareX = col * this.cellSize + innerSquareSize;
        const endOfInnerSquareY = row * this.cellSize + innerSquareSize;


        // draw the top bisel 
        this.ctx.fillStyle = lightColor;
        this.ctx.beginPath();
        this.ctx.moveTo(startOfCellX, startOfCellY);
        this.ctx.lineTo(startOfInnerSquareX, startOfInnerSquareY);
        this.ctx.lineTo(endOfInnerSquareX, startOfInnerSquareY);
        this.ctx.lineTo(endOfCellX, startOfCellY);
        this.ctx.closePath();
        this.ctx.fill();

        // draw the right bisel
        this.ctx.fillStyle = mediumColor;
        this.ctx.beginPath();

        this.ctx.moveTo(endOfCellX, startOfCellY);
        this.ctx.lineTo(endOfInnerSquareX, startOfInnerSquareY);
        this.ctx.lineTo(endOfInnerSquareX, endOfInnerSquareY);
        this.ctx.lineTo(endOfCellX, endOfCellY);
        this.ctx.closePath();
        this.ctx.fill();

        // draw the bottom bisel
        this.ctx.fillStyle = darkColor;
        this.ctx.beginPath();
        this.ctx.moveTo(endOfCellX, endOfCellY);
        this.ctx.lineTo(endOfInnerSquareX, endOfInnerSquareY);
        this.ctx.lineTo(startOfInnerSquareX, endOfInnerSquareY);
        this.ctx.lineTo(startOfCellX, endOfCellY);
        this.ctx.closePath();
        this.ctx.fill();



        

        // const grad = this.ctx.createLinearGradient(col * this.cellSize, row * this.cellSize, col * this.cellSize, row * this.cellSize + this.cellSize);

        // grad.addColorStop(0, darkColor);
        // grad.addColorStop(1, lightColor);

        // // draw the gradient
        // this.ctx.fillStyle = grad;
        // this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);

        // // draw the border
        // this.ctx.strokeStyle = 'black';
        // this.ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);

    }

    drawPhantomPiece(piece) {
        const shape = piece.getShape();
        const color = piece.getColor();
        const row = piece.row;
        const col = piece.col;
        const width = piece.getShapeWidth();
        const height = piece.getShapeHeight();
        
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (shape[i][j] !== 0) {
                    this.drawPhantomCell(row + i, col + j, color);
                }
            }
        }
    }

    drawPhantomCell(row, col, color) {
        const lightColor = color[0];
        const mainColor = color[1];
        const mediumColor = color[2];   
        const darkColor = color[3];
        const cellSize = this.cellSize;

        // draw the main cell color
        this.ctx.fillStyle = lightColor;

        // draw the border of the cell
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);

        // draw the gradient
        this.ctx.fillStyle = mainColor;
        this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);

    }


    drawPhantom(piece) {
        // draw the piece
        this.drawPhantomPiece(piece);
    }
}

