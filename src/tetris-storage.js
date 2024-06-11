
export class TetrisStorage {
  constructor() {
    this.storage = window.localStorage;
  }

  getScores() {
    return JSON.parse(this.storage.getItem('scores'));
  }

  saveScore(name, score) {
    const scores = this.getScores() || [];
    scores.push({ name, score });
    this.storage.setItem('scores', JSON.stringify(scores));
  }
}