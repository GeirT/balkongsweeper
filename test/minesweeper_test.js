var assert     = require('chai').assert;
var createGame = require('../src/minesweeper').createGame;
var getMineCount = require('../src/minesweeper').getMineCount;
var revealTile = require('../src/minesweeper').revealTile;
var isGameOver = require('../src/minesweeper').isGameOver;

var generateRandomNumbers = require('../src/utils').generateRandomNumbers;

describe('Minesweeper utils', function () {
  it('should generate a fixed amount of unique random ints within a range', function () {
    var randomNumbers = generateRandomNumbers(5, 10);

    assert.equal(randomNumbers.length, 5);

    var withinRange = true;

    var matches = randomNumbers.filter(function (num) {
      return num >= 0 && num < 10;
    })

    assert.equal(matches.length, 5);

    var result = []
    var isUnique = true;

    randomNumbers.forEach(function (num) {
      if (result.indexOf(num) > -1) {
        isUnique = false;
      }
    });

    assert.equal(isUnique, true);
  });
});

describe('Minesweeper', function() {
  var game;
  var mineCount = 2;

  beforeEach(function () {
    game = createGame({
      rows: 4,
      cols: 4,
      mines: mineCount
    });
  });

  it('Should populate mines', function () {
    assert.equal(getMineCount(game), mineCount);
  });

  it('Should set tile to isRevealed', function () {
    var mockGame = {
      rows: 4,
      cols: 4,
      tiles: [
        {id: 0},  {id: 1},               {id: 2},  {id: 3},
        {id: 4},  {id: 5, isMine: true}, {id: 6},  {id: 7, isMine: true},
        {id: 8},  {id: 9},               {id: 10}, {id: 11},
        {id: 12}, {id: 13},              {id: 14}, {id: 15}
      ]
    };

    revealTile(mockGame, 15);

    assert.equal(mockGame.tiles[15].isRevealed, true);
  });

  it('Should set threatCount to a number', function () {
    var mockGame = {
      rows: 4,
      cols: 4,
      tiles: [
        {id: 0},  {id: 1},               {id: 2},  {id: 3},
        {id: 4},  {id: 5, isMine: true}, {id: 6},  {id: 7, isMine: true},
        {id: 8},  {id: 9},               {id: 10}, {id: 11},
        {id: 12}, {id: 13},              {id: 14}, {id: 15}
      ]
    };

    revealTile(mockGame, 15);

    assert.equal(typeof mockGame.tiles[15].threatCount === 'number', true);
  });

  it('Should set threatCount to 2', function () {
    var mockGame = {
      rows: 4,
      cols: 4,
      tiles: [
        {id: 0},  {id: 1},               {id: 2},  {id: 3},
        {id: 4},  {id: 5, isMine: true}, {id: 6},  {id: 7, isMine: true},
        {id: 8},  {id: 9},               {id: 10}, {id: 11},
        {id: 12}, {id: 13},              {id: 14}, {id: 15}
      ]
    };

    revealTile(mockGame, 10);

    assert.equal(mockGame.tiles[10].threatCount, 2);
  });

  it('Should return game over', function () {
    var mockGame = {
      rows: 4,
      cols: 4,
      tiles: [
        {id: 0},  {id: 1},               {id: 2},  {id: 3},
        {id: 4},  {id: 5, isMine: true}, {id: 6},  {id: 7, isMine: true},
        {id: 8},  {id: 9},               {id: 10}, {id: 11},
        {id: 12}, {id: 13},              {id: 14}, {id: 15}
      ]
    };

    revealTile(mockGame, 5);

    assert.equal(isGameOver(mockGame), true)
  });
});
