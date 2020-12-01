import * as config from './config.js';

let gamefield;

/**
 * @param {number} x
 * @param {number} y
 * @param {string} className
 */
export function setCell(x, y, className) {
  const cellId = `x${x}y${y}`;
  const cell = document.getElementById(cellId);
  cell.className = className;
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
export function getCell(x, y) {
  const cellId = `x${x}y${y}`;
  const cell = document.getElementById(cellId);
  return cell.className;
}

export function addApple() {
  let appleX;
  let appleY;

  do {
    appleX = Math.floor(Math.random() * config.FIELD_WIDTH);
    appleY = Math.floor(Math.random() * config.FIELD_HEIGHT);
  } while (getCell(appleX, appleY) !== config.CELLS.BLANK);

  setCell(appleX, appleY, config.CELLS.APPLE);
}

export function create() {
  gamefield = document.getElementById('gamefield');

  fillGrass();
  addWalls();
  addApple();
}

function addWalls() {
  for (let y = 0; y < config.FIELD_HEIGHT; y++) {
    for (let x = 0; x < config.FIELD_WIDTH; x++) {
      if (x === 0 || y === 0 || x === (config.FIELD_WIDTH - 1) || y === (config.FIELD_HEIGHT - 1)) {
        setCell(x, y, config.CELLS.WALL);
      }
    }
  }
}

function fillGrass() {
  gamefield.style.width = `${config.FIELD_WIDTH * config.CELL_SIZE}px`;
  gamefield.style.height = `${config.FIELD_HEIGHT * config.CELL_SIZE}px`;

  for (let y = 0; y < config.FIELD_HEIGHT; y++) {
    for (let x = 0; x < config.FIELD_WIDTH; x++) {
      const cell = document.createElement('div');
      cell.id = `x${x}y${y}`;
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);

      cell.style.position = 'absolute';

      cell.style.width = `${config.CELL_SIZE}px`;
      cell.style.height = `${config.CELL_SIZE}px`;

      cell.style.top = `${y * config.CELL_SIZE}px`;
      cell.style.left = `${x * config.CELL_SIZE}px`;

      gamefield.appendChild(cell);

    }
  }
}