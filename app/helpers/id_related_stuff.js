function isValidId(value) {
  return (isFinite(value) && value  > 0 );
}

function getRandomInt(range = 100) {
  return Math.floor(Math.random() * range) + 1;
}

module.exports = {
  isValidId,
  getRandomInt
};
