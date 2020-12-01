'use strict';

import { DIRECTIONS, CELLS } from './config.js';
import { create as createGameField, addApple } from './gamefield.js';
import Snake from './snake.js';

let cycleDurationMs = 500;
let snake;

function init() {
  // TODO: хвост
  // переделайте createGameField так, чтбы он возвращал
  // ссылку на DOM элемент #gamefield и нам не надо было
  // получать его тут
  createGameField();

  const gf = document.querySelector('#gamefield');
  gf.addEventListener('click', handleCellClick);

  snake = new Snake({ x: 14, y: 5 });

  moveSnake();
}

/**
 *
 * @param {*} e
 */
function handleCellClick(e) {
  const clickX = Number(e.target.dataset.x);
  const clickY = Number(e.target.dataset.y);

  const head = snake.getHead();

  const { x, y } = head;

  const isVertical =
    snake.direction === DIRECTIONS.DOWN ||
    snake.direction === DIRECTIONS.UP;

  if (isVertical) {
    if (x < clickX) {
      snake.direction = DIRECTIONS.RIGHT;
    }
    if (x > clickX) {
      snake.direction = DIRECTIONS.LEFT;
    }
  } else {
    if (y < clickY) {
      snake.direction = DIRECTIONS.DOWN;
    }
    if (y > clickY) {
      snake.direction = DIRECTIONS.UP;
    }
  }
}

function moveSnake() {
  setTimeout(moveSnake, cycleDurationMs);
  const obstacle = snake.move();
  if (obstacle) {
    if (obstacle === CELLS.APPLE) {
      snake.increaseLength();
      addApple();
      // TODO: хвост
      // сделайте, чтобы с каждым яблоком змея ползала быстрее
      return;
    }

    // TODO: хвост
    // в конце игры выведите счет пользователя - количество "собранных" яблок
    // сделайте так, чтобы игра пошла заново
    alert('Доползался!');
  }
}

/**
 * @param {KeyboardEvent} keyEvent
 */
function handleKeyDown(keyEvent) {

  const directionsMap = {
    ArrowUp: DIRECTIONS.UP,
    ArrowDown: DIRECTIONS.DOWN,
    ArrowLeft: DIRECTIONS.LEFT,
    ArrowRight: DIRECTIONS.RIGHT,
  };

  const newDirection = directionsMap[keyEvent.key];
  if (newDirection) {
    snake.direction = newDirection;
  }
}

window.addEventListener('load', init);
window.addEventListener('keydown', handleKeyDown);