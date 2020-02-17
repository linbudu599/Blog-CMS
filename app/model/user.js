"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Admin = app.model.define(
    "admin",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      password: STRING(30)
    },
    {
      tableName: "admin_user"
    }
  );

  return Admin;
};
