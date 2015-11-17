var generateRandomNumbers = require('./utils').generateRandomNumbers;

function createGame(options) {
  var tiles = [];
  var tileCount = options.rows * options.cols;
  var mineIds = generateRandomNumbers(options.mines, tileCount);

  for (var i=0; i < tileCount; i++) {
    tiles.push({
      id: i,
      isMine: mineIds.indexOf(i) > -1
    });
  }

  var game = {
    cols: options.cols,
    rows: options.rows,
    tiles: tiles,
    isOver: false
  };

  return game;
}


function getMineCount (game) {
  var count = 0;

  for (var i = 0; i < game.tiles.length; i += 1) {
    if (game.tiles[i].isMine) {
      count += 1;
    }
  }

  return count;
}

function tileIsMine(tile) {
  return tile && tile.isMine;
}

function revealTile (game, tileId) {
  var currTile = game.tiles[tileId];

  if (!currTile || (currTile && currTile.isRevealed)) {
    return;
  }

  if (currTile.isMine) {
    game.isOver = true;
    return;
  }

  currTile.isRevealed = true;

  var surroundingTiles = [];
  var rowId = tileId % game.rows;
  var colId = tileId % game.cols;
  var leftTile = (rowId > 0 && tileId > 0 )? game.tiles[tileId - 1] : null;
  var rightTile = (colId < game.cols - 1 && tileId >= game.tiles.length) ? null : game.tiles[tileId + 1];
  var aboveRowId = tileId - game.cols;
  var belowRowId = tileId + game.cols;

  if (leftTile) {
    surroundingTiles.push(leftTile);
  }

  if (rightTile) {
    surroundingTiles.push(rightTile);
  }

  // Check top center cell
  if (game.tiles[aboveRowId]) {
    surroundingTiles.push(game.tiles[aboveRowId]);
  }

  // Check top left cell
  if (game.tiles[aboveRowId - 1]) {
    surroundingTiles.push(game.tiles[aboveRowId - 1]);
  }

  // Check top right cell
  if (game.tiles[aboveRowId + 1]) {
    surroundingTiles.push(game.tiles[aboveRowId + 1]);
  }

  // Check bottom center cell
  if (game.tiles[belowRowId]) {
    surroundingTiles.push(game.tiles[belowRowId]);
  }

  // Check bottom left cell
  if (game.tiles[belowRowId - 1]) {
    surroundingTiles.push(game.tiles[belowRowId - 1]);
  }

  // Check bottom right cell
  if (game.tiles[belowRowId + 1]) {
    surroundingTiles.push(game.tiles[belowRowId + 1]);
  }

  var threatCount = 0;

  surroundingTiles.forEach(function (tile) {
    if (tile.isMine) {
      threatCount += 1;
    }
  });

  if (threatCount == 0) {
    surroundingTiles.forEach(function (tile) {
      revealTile(game, tile.id);
    });
  }

  currTile.threatCount = threatCount;
}

function isGameOver(game) {
  return game.isOver;
}

exports.createGame = createGame;
exports.getMineCount = getMineCount;
exports.revealTile = revealTile;
exports.isGameOver = isGameOver;
