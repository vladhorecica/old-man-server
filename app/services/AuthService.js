const config = require('../../config');
const jwt = require('jsonwebtoken');
const userService = require('./UserService');


async function authenticate({ username, password }) {
  return await userService.me(username, password)
    .then(user => {
      const token = jwt.sign({ sub: user.id }, config.jwt.secret);

      return {
        ...user,
        token
      };
  });
}

module.exports = {
  authenticate
};
