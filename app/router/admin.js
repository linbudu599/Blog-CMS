module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  // adminauth -> middleware
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
};
