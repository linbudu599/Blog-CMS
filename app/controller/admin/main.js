"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = "hi api";
  }
  async isLoginedIn() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({
      where: { username, password }
    });
    if (user) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      ctx.status = 200;
      this.ctx.body = {
        code: 0,
        message: "success",
        openId
      };
    } else {
      this.ctx.status = 401;
      this.ctx.body = {
        code: 1,
        message: "failure"
      };
    }
  }
  //后台文章分类信息
  async getTypeInfo() {
    const ctx = this.ctx;
    const res = await ctx.model.Type.findAll();
    this.ctx.body = res;
  }

  async createArticle() {
    const ctx = this.ctx;
    let tmpArticle = ctx.request.body;
    const res = await ctx.model.Article.create(tmpArticle);
    console.log(res);
    const {
      dataValues: { id },
      _options: { isNewRecord }
    } = res;

    this.ctx.body = {
      isScuccess: isNewRecord,
      insertId: id
    };
  }

  async updateArticle() {
    let tmpArticle = this.ctx.request.body;
    const result = await this.ctx.model.Article.update(tmpArticle, {
      where: {
        id: tmpArticle.id
      }
    });
    console.log(result);
    if (result[0] >= 1) {
      this.ctx.body = {
        isScuccess: true
      };
    } else {
      this.ctx.body = {
        msg: "更新失败，可能是因为内容不变~",
        isScuccess: false
      };
    }
  }

  async getArticleList() {
    const resList = await this.ctx.model.Article.findAll();
    this.ctx.body = { list: resList };
  }

  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.ctx.model.Article.destroy({ where: { id } });
    this.ctx.body = { isSuccess: res === 1 };
  }

  async getArticleById() {
    let id = this.ctx.params.id;
    console.log(id);
    const result = await this.ctx.model.Article.findOne({
      where: {
        id
      }
    });
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
