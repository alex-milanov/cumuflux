"use strict";

var config = require('../config');

// init the database (mongo)
var database = require("./init/database")(config);

// init the server
var server = require("./init/server")(config, database);

// init the auth (passport)
require("./init/auth")(config);

// on server start (crete admin, load initial data)
require("./init/start")(config);

// Start the server by listening on <port>
server.listen(config.port);

// expose the server
exports = module.exports = server;

// done
console.log('api served port ' + config.port);