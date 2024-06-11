export default class TetrisScore {
  constructor() {
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.scoreElement = document.getElementById('score');
    this.levelElement = document.getElementById('level');
    this.linesElement = document.getElementById('lines');
  }

  addScore(points) {
    this.score += points;
    this.scoreElement.textContent = this.score;
  }

  addLines(lines) {
    this.lines += lines;
    this.linesElement.textContent = this.lines;
    this.level = Math.floor(this.lines / 10) + 1;
    this.levelElement.textContent = this.level;
  }

  getScore() {
    return this.score;
  }

  getLevel() {
    return this.level;
  }

  getLines() {
    return this.lines;
  }

  reset() {
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.scoreElement.textContent = this.score;
    this.levelElement.textContent = this.level;
    this.linesElement.textContent = this.lines;
  }
}