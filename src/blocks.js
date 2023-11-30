export class Block {
  constructor(field) {
    this.#field = field;
  }

  #field;
  matrix;
  color;

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
          field[row][col] = value // bug Cannot set properties of undefined (setting '5')
        }
      }
    }
  }

  #isMoved({horizon = 0, vertical = 0}) {

    const newPosition = {row: this.#position.row + vertical, col: this.#position.col + horizon};
    if (newPosition.row + this.matrix.length > this.#field.length) return false;
    if (newPosition.col < 0 || newPosition.col + this.matrix[0].length > this.#field[0].length) return false;
    const cutField = [];

    for (let row = newPosition.row; row < newPosition.row + this.matrix.length; row++) {
      const cutRow = [];
      cutField.push(cutRow)
      for (let col = newPosition.col; col < newPosition.col + this.matrix[0].length; col++) {
        cutRow.push(this.#field[row][col] === 0 ? 0 : 1);
      }
    }

    for (let row = vertical; row < this.matrix.length; row++) {
      this.matrix[row].forEach((col, colIdx) => {
        if (((col === 0 ? 0 : 1) & cutField[row - vertical][colIdx - horizon]) === 1) cutField[row - vertical][colIdx - horizon] = 0
      })
    }

    return !cutField.some(
        (row, rowIdx) => row.some(
            (col, colIdx) => (this.matrix[rowIdx][colIdx] === 0 ? 0 : 1) & col
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
      this.#print()
      return true
    }

    return false;
  }

  rotate() {
    const newCurrent = [];
    this.#erase()
    const colCount = this.matrix[0].length
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      const newRow = [];
      newCurrent[colCount - 1 - colIdx] = newRow;
      this.matrix.forEach(row => {
        newRow.push(row[colIdx])
      })
    }
    this.matrix = newCurrent;
    this.#print()
  }
}

export const color = [null, 'cyan', 'yellow', 'purple', 'green', 'red', 'blue', 'orange']

class Square extends Block {
  constructor(field) {
    super(field);
    this.color = 1;
    this.matrix = [
      [1, 1],
      [1, 1],
    ];
  }
}

class Ship extends Block {
  constructor(field) {
    super(field);
    this.color = 2;
    this.matrix = [
      [0, 1, 0],
      [1, 1, 1],
    ];
  }
}

class L extends Block {
  constructor(field) {
    super(field);
    this.color = 3
    this.matrix = [
      [1, 0],
      [1, 0],
      [1, 1],
    ];
  }
}

class J extends Block {
  constructor(field) {
    super(field);
    this.color = 4
    this.matrix = [
      [0, 1],
      [0, 1],
      [1, 1],
    ];
  }
}

class Stick extends Block {
  constructor(field) {
    super(field);
    this.color = 5
    this.matrix = [
      [1],
      [1],
      [1],
      [1],
    ];
  }
}

class Z extends Block {
  constructor(field) {
    super(field);
    this.color = 6
    this.matrix = [
      [1, 1, 0],
      [0, 1, 1],
    ];
  }
}

class S extends Block {
  constructor(field) {
    super(field);
    this.color = 7
    this.matrix = [
      [0, 1, 1],
      [1, 1, 0],
    ];
  }
}

export function getRandomBlock(field) {
  const blocks = [Square, Ship, L, J, Stick, S, Z]
  return new blocks[Math.floor(Math.random() * blocks.length)](field);
}