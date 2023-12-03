export class Block {
  constructor(field) {
    this.#field = field;
  }

  #field;
  matrix;
  #position = {row: 0, col: 3}

  left() {
    if (this.#isMoved({horizon: -1})) {
      this.#erase()
      this.#position.col = this.#position.col - 1;
      this.#print()
      return true
    }
    return false;
  }

  right() {
    if (this.#isMoved({horizon: 1})) {
      this.#erase()
      this.#position.col = this.#position.col + 1;
      this.#print()
      return true
    }
    return false;
  }

  #print(value = this.color) {
    const field = this.#field;
    const rowCount = this.matrix.length,
        colCount = this.matrix[0].length
    for (let row = this.#position.row; row < this.#position.row + rowCount; row++) {
      for (let col = this.#position.col; col < this.#position.col + colCount; col++) {
        if (this.matrix[row - this.#position.row][col - this.#position.col] > 0) {
          field[row][col] = value === 0 ? 0 : this.matrix[row - this.#position.row][col - this.#position.col] // bug Cannot set properties of undefined (setting '5')
        }
      }
    }
  }

  #isMoved({horizon = 0, vertical = 0, matrix = this.matrix}) {
    const newPosition = {row: this.#position.row + vertical, col: this.#position.col + horizon};
    if (newPosition.row + matrix.length > this.#field.length) return false;
    if (newPosition.col < 0 || newPosition.col + matrix[0].length > this.#field[0].length) return false;
    const cutField = [];

    for (let row = newPosition.row; row < newPosition.row + matrix.length; row++) {
      const cutRow = [];
      cutField.push(cutRow)
      for (let col = newPosition.col; col < newPosition.col + matrix[0].length; col++) {
        const value = this.matrix[row - newPosition.row + vertical]?.[col - newPosition.col + horizon] ? 1 : 0;
        cutRow.push(this.#field[row][col] === 0 || value === 1 ? 0 : 1);
      }
    }

    return !cutField.some(
        (row, rowIdx) => row.some(
            (col, colIdx) => (matrix[rowIdx][colIdx] === 0 ? 0 : 1) & col
        )
    )
  }

  #erase() {
    this.#print(0)
  }

  down() {
    if (this.#isMoved({vertical: 1})) {
      this.#erase()
      this.#position.row = this.#position.row + 1;
      this.#print();
      return true
    }

    return false;
  }

  fall() {
    if(this.down())
      setTimeout(() => this.fall(), 30)
  }

  rotate() {
    const newCurrent = [];
    const colCount = this.matrix[0].length
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      const newRow = [];
      newCurrent[colCount - 1 - colIdx] = newRow;
      this.matrix.forEach(row => {
        newRow.push(row[colIdx])
      })
    }
    if (this.#isMoved({matrix: newCurrent})) {
      this.#erase()
      this.matrix = newCurrent;
      this.#print()
    }
  }
}

export const color = [null, 'cyan', 'yellow', 'purple', 'green', 'red', 'blue', 'orange']

class Square extends Block {
  constructor(field) {
    super(field);
    this.matrix = [
      [1, 1],
      [1, 1],
    ];
  }
}

class Ship extends Block {
  constructor(field) {
    super(field);
    this.matrix = [
      [0, 1, 0],
      [2, 2, 2],
    ];
  }
}

class L extends Block {
  constructor(field) {
    super(field);
    this.matrix = [
      [3, 0],
      [3, 0],
      [3, 3],
    ];
  }
}

class J extends Block {
  constructor(field) {
    super(field);
    this.matrix = [
      [0, 4],
      [0, 4],
      [4, 4],
    ];
  }
}

class Stick extends Block {
  constructor(field) {
    super(field);
    this.matrix = [
      [5],
      [5],
      [5],
      [5],
    ];
  }
}

class Z extends Block {
  constructor(field) {
    super(field);
    this.matrix = [
      [6, 6, 0],
      [0, 6, 6],
    ];
  }
}

class S extends Block {
  constructor(field) {
    super(field);
    this.matrix = [
      [0, 7, 7],
      [7, 7, 0],
    ];
  }
}

export function getRandomBlock(field) {
  const blocks = [Square, Ship, L, J, Stick, S, Z]
  // return new Ship(field);
  return new blocks[Math.floor(Math.random() * blocks.length)](field);
}