module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get("/admin/index", controller.admin.main.index);
  router.post("/admin/login", controller.admin.main.isLoginedIn);
  router.get(
    "/admin/getTypeInfo",
    adminauth,
    controller.admin.main.getTypeInfo
  );
  router.post(
    "/admin/addArticle",
    adminauth,
    controller.admin.main.createArticle
  );
  router.post(
    "/admin/updateArticle",
    adminauth,
    controller.admin.main.updateArticle
  );
  router.get(
    "/admin/getArticleList",
    adminauth,
    controller.admin.main.getArticleList
  );
  router.get(
    "/admin/delArticle/:id",
    adminauth,
    controller.admin.main.delArticle
  );
  router.get(
    "/admin/getArticleById/:id",
    adminauth,
    controller.admin.main.getArticleById
  );
};
