"use strict";

const client = require("./router/default");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  client(app);
};
