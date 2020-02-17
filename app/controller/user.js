const Controller = require("egg").Controller;

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async check() {
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


  async getTypeInfo() {
    const res = await ctx.model.User.findAll({
      where: { username, password }
    });
  }
}

module.exports = UserController;
