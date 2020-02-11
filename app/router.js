"use strict";

const client = require("./router/default");
const admin = require("./router/admin");
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  client(app);
  admin(app);
};
