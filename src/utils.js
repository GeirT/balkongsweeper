function generateRandomNumbers (amount, max) {
  var result = []

  while (result.length < amount) {
    var newNum = Math.floor(Math.random() * max);

    if (result.indexOf(newNum) === -1) {
      result.push(newNum);
    }
  }

  return result;
}

exports.generateRandomNumbers = generateRandomNumbers;