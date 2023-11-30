import './css/index.css'
import {color, getRandomBlock} from './blocks'

class Tetris {

  #grid = 32;
  #canvas = document.getElementById('game');
  #context = this.#canvas.getContext('2d');

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

  #fallTimeout = 250;

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


  start() {
    requestAnimationFrame(this.#loop.bind(this));
    setInterval(() => {
      if (!this.#current.down()) {
        this.#fallTimeout = 500;
        this.#findLineWin();
        this.#current = getRandomBlock(this.#field);
      }
    }, this.#fallTimeout)

  }

  #findLineWin() {
    for (let row = this.#field.length - 1; row >= 0; row--) {
      if (this.#field[row].every(Boolean)) {
        this.#field.splice(row, 1);
        this.#field = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ...this.#field
        ];
        row++;
      }
    }
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
    this.#fallTimeout = 100;
  }
}

const tetris = new Tetris();

tetris.start();

document.addEventListener('keydown', function (e) {
  e.which === 37 && tetris.left();
  e.which === 39 && tetris.right();
  e.which === 32 && tetris.rotate();
  e.which === 40 && tetris.fall();

})
