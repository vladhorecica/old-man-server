const express = require('express');
const router = express.Router();
const authService = require('../services/AuthService');
const userService = require('../services/UserService');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.get('/:num', get);
router.post('/', create);
router.put('/:num', update);
router.delete('/:num', deleteUser);

module.exports = router;

function authenticate(req, res, next) {
    authService.authenticate(req.body)
        .then((user) => {
            return user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' });
        }).catch(err => next(err));
}

function getAll(req, res, next) {
    let query = {
        limit: 50,
        offset: 0
    };

    if (req.query && req.query.query) {
        query = JSON.parse(req.query.query);
    }

    userService.getAll(query)
        .then(result => res.json(result))
        .catch(err => next(err));
}

function get(req, res, next) {
    const id = req.params.num;
    userService.getUser(id)
        .then(user => res.json({data: user}))
        .catch(err => next(err));
}

function create(req, res, next) {
    const data = req.body;

    // Idk maybe add some validation...
    userService.createUser(data)
        .then(user => res.json({data: user}))
        .catch(err => next(err));
}

function update(req, res, next) {
    const data = req.body;
    const id = req.params.num;

    // again, add those validations brah...
    userService.updateUser(id, data)
        .then(user => res.json({data: user}))
        .catch(err => next(err));
}

function deleteUser(req, res, next) {
    const id = req.params.num;

    userService.deleteUser(id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
