"use strict";

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Article = app.model.define(
    "article",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type_id: INTEGER(30),
      title: STRING(30),
      article_content: STRING(30),
      intro: STRING(30),
      addTime: INTEGER(30),
      view_count: INTEGER(30)
    },
    {
      tableName: "article",
      timestamps: false,
      underscored: false
    }
  );

  return Article;
};
