const faker = require("faker");
const { isValidId, getRandomInt } = require('../helpers/id_related_stuff');

const TOTAL_USER_NUMBER = 270;


async function createUser(data) {
  return await new Promise((resolve) => {
    setTimeout(
      resolve({
        id: getRandomInt(10),
        ...data
      }),
      2000
    );
  });
}

async function updateUser(id, data) {
  let user = await new Promise((resolve) => {
    setTimeout(resolve(fakeUser({id})), 1000)
  });

  user = {
    ...user,
    ...data
  };

  const { password, ...userWithoutPassword } = user;

  return await new Promise((resolve) => {
    setTimeout(resolve(userWithoutPassword), 1000)
  });
}

async function deleteUser(id) {
  if (isValidId(id)) {
    return await new Promise(
      (resolve) => {
        setTimeout(resolve(true), 2000)
      }
    );
  }

  return await new Promise((resolve, reject) => {
    reject('Invalid user id');
  });
}

async function getUser(id) {
  if (isValidId(id)) {
    return await new Promise((resolve) => {
      const { password, ...userWithoutPassword } = fakeUser({id});
      setTimeout(
        resolve(userWithoutPassword),
        2000
      )
    });
  }

  return await new Promise((resolve, reject) => {
    reject('Invalid user id');
  });
}

async function getAll({offset, limit}) {
  let i = 0;
  let users = [];

  if (offset < TOTAL_USER_NUMBER && limit > TOTAL_USER_NUMBER) {
    limit = TOTAL_USER_NUMBER - offset;
  }

  while (i < limit) {
    let id = offset + i + 1;
    const { password, ...userWithoutPassword } = fakeUser({id});
    users.push(userWithoutPassword);
    i++;
  }

  const result = {
    meta: {
      total: TOTAL_USER_NUMBER,
      offset
    },
    data: users
  };

  return await new Promise((resolve) => {
    setTimeout(resolve(result), 2000);
  });
}

async function me(username, password) {
  return await new Promise((resolve) => {
    const id = getRandomInt(10);
    const user = fakeUser({id, username, password});

    setTimeout(
      resolve(user),
      2000
    )
  });
}

function fakeUser(options = false) {
  let user = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  };

  if (options) {
    user = {
      ...user,
      ...options
    }
  }

  return user;
}

module.exports = {
  deleteUser,
  getUser,
  createUser,
  updateUser,
  me,
  getAll
};
