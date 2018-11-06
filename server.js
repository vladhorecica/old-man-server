/*
 * BASE SETUP =================================================================
 */

require('rootpath')();
const express      = require('express');    // call express
const app          = express();             // define our app using express
const bodyParser   = require('body-parser');
const cors         = require('cors');
const jwt          = require('./app/helpers/jwt');
const errorHandler = require('./app/helpers/error_handler');
const config       = require('./config');

app.use(cors());
// configure app to use bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Use JWT auth to secure the api
app.use(jwt());

const port = process.env.PORT || config.port;   // Set our port

/*
 * Define routes ==============================================================
 */
app.use('/users', require('app/controllers/users.controller'));

/*
 * Error handler ===============================================================
 */
app.use(errorHandler);

/*
 * START THE SERVER =============================================================
 */
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
