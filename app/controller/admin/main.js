"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    //article list data in index page
    this.ctx.body = "hi api";
  }

  async isLoginedIn() {
    // crybto
    let { username, password } = this.ctx.request.body;
    console.log(username, password);
    const sql =
      "SELECT username FROM admin_user WHERE username = '" +
      username +
      "' AND password = '" +
      password +
      "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = {
        code: 0,
        message: "success",
        // FIXME: use a safer way
        openId
      };
    } else {
      this.ctx.body = {
        code: 1,
        message: "failure"
      };
    }
  }

  //后台文章分类信息
  async getTypeInfo() {
    const res = await this.app.mysql.select("type");
    this.ctx.body = { data: res };
  }

  async createArticle() {
    let tmpArticle = this.ctx.request.body;
    console.log(tmpArticle);
    const result = await this.app.mysql.insert("article", tmpArticle);
    console.log(result);
    const { affectedRows, insertId } = result;

    const insertSuccess = affectedRows === 1;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId
    };
  }

  async updateArticle() {
    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update("article", tmpArticle);
    console.log(result);
    const { affectedRows } = result;

    const updateSuccess = affectedRows === 1;

    this.ctx.body = {
      isScuccess: updateSuccess
    };
  }

  async getArticleList() {
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.intro as introduce," +
      "article.view_count as view_count," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "ORDER BY article.id DESC ";

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }

  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete("article", { id: id });
    this.ctx.body = { data: res };
  }

  async getArticleById() {
    let id = this.ctx.params.id;

    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.intro as introduce," +
      "article.article_content as article_content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.id=" +
      id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
