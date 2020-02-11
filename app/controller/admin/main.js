"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    //article list data in index page
    this.ctx.body = "hi api";
  }

  async isLoginedIn() {
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
        // FIXME: use a safer way
      };
    }
  }
}

module.exports = MainController;
