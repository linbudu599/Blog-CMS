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
    const { affectedRows } = result;

    const updateSuccess = affectedRows === 1;

    this.ctx.body = {
      isScuccess: updateSuccess
    };
  }
}

module.exports = MainController;
