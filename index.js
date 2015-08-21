"use strict";

/**
 * First we set the node enviornment variable if not set before
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


exports = module.exports = require("./api");
