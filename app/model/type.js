"use strict";

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Type = app.model.define(
    "type",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      typeName: STRING(30),
      orderName: STRING(30),
      icon: STRING(30)
    },
    {
      tableName: "type",
      timestamps: false,
      underscored: false
    }
  );

  return Type;
};
