const expressJwt = require('express-jwt');
const config = require('../../config');

module.exports = jwt;

function jwt() {
    // public routes that don't require authentication
    return expressJwt({ secret: config.jwt.secret }).unless({
        path: [
            '/',
            '/users/authenticate',
            { url: '/users/', methods: ['POST']}
        ]
    });
}
