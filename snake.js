import { DIRECTIONS, INITIAL_LENGTH, CELLS } from './config.js';
import { getCell, setCell } from './gamefield.js';

/**
 * @param {object} startPosition
 * @param {number} startPosition.x
 * @param {number} startPosition.y
 */
function Snake(startPosition) {

  this.direction = DIRECTIONS.LEFT;
  this.maxLength = INITIAL_LENGTH;

  this.body = [];
  for (let segmentIndex = 0; segmentIndex < this.maxLength; segmentIndex++) {
    this.body.push({
      x: startPosition.x + segmentIndex,
      y: startPosition.y,
    });
  }

  this.getHead = function() {
    return this.body[0];
  };

  this.move = function() {
    const head = this.getHead();
    const nextHead = {
      x: head.x,
      y: head.y,
    };

    switch (this.direction) {
    case DIRECTIONS.LEFT:
      nextHead.x = nextHead.x - 1;
      break;
    case DIRECTIONS.DOWN:
      nextHead.y = nextHead.y + 1;
      break;
    case DIRECTIONS.UP:
      nextHead.y = nextHead.y - 1;
      break;
    case DIRECTIONS.RIGHT:
      nextHead.x = nextHead.x + 1;
      break;
    default:
      console.log('ERROR: uknown direction:', this.direction);
    }

    const obstacle = getCell(nextHead.x, nextHead.y);

    this.body.unshift(nextHead);
    setCell(nextHead.x, nextHead.y, CELLS.SNAKE);
    this.trimmingTail();
    return obstacle;
  };


  this.trimmingTail = function() {
    if (this.maxLength < this.body.length) {
      const tail = this.body.pop();
      setCell(tail.x, tail.y, CELLS.BLANK);
    }
  };

  this.drawInitialSnake = function () {
    this.body.forEach(bodyPart => setCell(bodyPart.x, bodyPart.y, CELLS.SNAKE));
  };

  this.increaseLength = function() {
    this.maxLength = this.maxLength + 1;
  };

  this.drawInitialSnake();
}

export default Snake;