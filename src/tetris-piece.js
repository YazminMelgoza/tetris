// tetris-piece.js
// This file contains the TetrisPiece class, which represents a single Tetris piece.

export default class TetrisPiece {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.setRandomColumn();
        this.row = 0;
        this.rotationIndex = 0;
    }

    getShape() {
        return this.shape;
    }

    rotate() {
        this.rotationIndex = (this.rotationIndex + 1) % this.shape.length;
    }

    getNumRotations() {
        return this.shape.length;
    }

    getRotationIndex() {
        return this.rotationIndex;
    }

    getColor() {
        return this.color;
    }

    moveLeft() {
        this.col--;
    }

    moveRight() {
        this.col++;
    }

    moveDown() {
        this.row++;
    }

    moveUp() {
        this.row--;
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    getShapeHeight() {
        return this.shape[0].length;
    }

    getShapeWidth() {
        return this.shape.length;
    }

    rotateBack() {
        this.rotationIndex = (this.rotationIndex - 1 + this.shape.length) % this.shape.length;
    }

    copy() {
        const piece = new TetrisPiece(this.shape, this.color);
        piece.rotationIndex = this.rotationIndex;
        piece.row = this.row;
        piece.col = this.col;
        return piece;
    }

    setRow(row) {
        this.row = row;
    }

    setCol(col) {
        this.col = col;
    }


    setRotationIndex(rotationIndex) {
        this.rotationIndex = rotationIndex;
    }

    setShape(shape) {
        this.shape = shape;
    }

    setColor(color) {
        this.color = color;
    }

    rotateShape() {
        const width = this.getShapeWidth(); 
        const height = this.getShapeHeight();
        const newShape = [];
        for (let i = 0; i < height; i++) {
            newShape.push(new Array(width).fill(0));
        }
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                newShape[j][width - i - 1] = this.shape[i][j];
            }
        }
        return newShape;
    }

    setRandomColumn() {
        // check the width of the piece
        const width = this.getShapeHeight();

        // check the width of the board
        const boardWidth = 10;

        // calculate the maximum column index
        const maxCol = boardWidth - width;

        // generate a random column index
        const randomCol = Math.floor(Math.random() * (maxCol + 1));

        this.col = randomCol;
        

    }
}
