/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "linbudu_cookie_key";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // cross origin config
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ["*"]
  };
  config.cors = {
    origin: "http://localhost:3000",
    credentials: true,
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: "localhost",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "111",
      // database
      database: "blogcms"
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  };

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "111",
    timezone: "+08:00",
    database: "blogcms",
    dateStrings: true,
    typeCast(field, next) {
      // for reading from database
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    }
  };

  return {
    ...config,
    ...userConfig
  };
};
