import './css/index.css'
import {color, getRandomBlock} from './blocks'

class Tetris {

  #grid = 32;
  #canvas = document.getElementById('game');
  #context = this.#canvas.getContext('2d');
  #scoreContainer = document.getElementById('score');
  #score;

  #field = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  #current = getRandomBlock(this.#field);
  #fallTimeout = 600;

  #loop() {
    requestAnimationFrame(this.#loop.bind(this));
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#field.forEach((row, rowIdx) =>
        row.forEach((col, colIdx) => {
          if (col > 0) {
            this.#context.fillStyle = color[col]; // 'white';
            this.#context.fillRect(colIdx * this.#grid, rowIdx * this.#grid, this.#grid - 1, this.#grid - 1);
          }
        }))
  }

  #printScore(score) {
    console.log(score)
    if (score === -1) {
      this.#score = 0;
    } else if (score === 1) {
      this.#score += score;
    } else if (score > 1) {
      this.#score += (score * 10);
    }

    if (this.#score < 5) {
      this.#fallTimeout = 600
    } else if (this.#score < 10) {
      this.#fallTimeout = 450
    } else if (this.#score < 20) {
      this.#fallTimeout = 350
    } else if (this.#score < 30) {
      this.#fallTimeout = 250
    } else {
      this.#fallTimeout = 150;
    }

    this.#scoreContainer.textContent = `Score ${this.#score}`
  }

  start() {
    requestAnimationFrame(this.#loop.bind(this));
    this.#printScore(-1)

    setTimeout(() => {

    }, this.#fallTimeout)

    setInterval(() => {
      if (!this.#current.down()) {
        this.#fallTimeout = 500;
        this.#printScore(this.#getCountLineWin());
        this.#current = getRandomBlock(this.#field);
      }
    }, this.#fallTimeout)

  }

  #getCountLineWin() {
    let count = 0;
    for (let row = this.#field.length - 1; row >= 0; row--) {
      if (this.#field[row].every(Boolean)) {
        count++;
        this.#field.splice(row, 1);
        this.#field = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ...this.#field
        ];
        row++;
      }
    }
    return count;
  }

  stop() {

  }

  left() {
    this.#current.left()
  }

  right() {
    this.#current.right()
  }

  rotate() {
    this.#current.rotate()
  }

  fall() {
    this.#current.fall()
  }
}

const tetris = new Tetris();

tetris.start();

document.addEventListener('keydown', function (e) {
  console.log(e.which)
  e.which === 37 && tetris.left();
  e.which === 39 && tetris.right();
  e.which === 38 && tetris.rotate();
  e.which === 32 && tetris.fall();

})
