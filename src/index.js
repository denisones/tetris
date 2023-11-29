import './css/index.css'


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

  #current = new Block(this.#field);

  #loop() {
    requestAnimationFrame(this.#loop.bind(this));
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#field.forEach((row, rowIdx) =>
        row.forEach((col, colIdx) => {
          if (col === 1) {
            this.#context.fillStyle = 'white';
            this.#context.fillRect(colIdx * this.#grid, rowIdx * this.#grid, this.#grid - 1, this.#grid - 1);
          }
        }))
  }


  start() {
    requestAnimationFrame(this.#loop.bind(this));

    setInterval(() => {
      if (!this.#current.down())
        this.#current = new Block(this.#field);
    }, 200)

  }

  stop() {

  }

  left() {
    this.#current.left()
  }

  right() {
    this.#current.right()
  }
}

class Block {
  constructor(field) {
    this.#field = field;
  }

  #field;

  #type = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ]
  #position = {row: 0, col: 3}

  left() {
    const {row, col} = this.#position;
    console.log(col)
    if (
        this.#field[row][col - 1] === undefined
        || this.#field[row][col - 1] === 1
        || this.#field[row + 1][col - 1] === 1
        || this.#field[row + 2][col - 1] === 1
    ) return;
    this.#erase()
    this.#position.col = this.#position.col -1;
    this.#print()
  }

  right() {
    const {row, col} = this.#position;
    console.log(col, this.#field[col + 4])
    if (
        this.#field[row][col + 3] === undefined
        || this.#field[row][col + 3] === 1
        || this.#field[row + 1][col + 3] === 1
        || this.#field[row + 2][col + 3] === 1
    ) return;
    this.#erase()
    this.#position.col = this.#position.col + 1;
    this.#print()
  }

  #print(value = 1) {
    const field = this.#field;
    for (let row = this.#position.row; row < this.#position.row + 3; row++) {
      for (let col = this.#position.col; col < this.#position.col + 3; col++) {
        if (this.#type[row - this.#position.row][col - this.#position.col] === 1) {
          field[row][col] = value
        }
      }
    }
  }

  #erase() {
    this.#print(0)
  }

  down() {
    const {row, col} = this.#position;
    if (
        this.#field[row + 3] === undefined
        || this.#field[row + 3][col] === 1
        || this.#field[row + 3][col + 1] === 1
        || this.#field[row + 3][col + 2] === 1
    ) return false;
    this.#erase()
    this.#position.row = this.#position.row + 1;
    this.#print()
    return true;
  }
}

const tetris = new Tetris();

tetris.start();

document.addEventListener('keydown', function (e) {
  e.which === 37 && tetris.left();
  e.which === 39 && tetris.right();
})
