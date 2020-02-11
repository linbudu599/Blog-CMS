module.exports = app => {
  const { router, controller } = app;
  // adminauth -> middleware
  router.get("/admin/index", controller.admin.main.index);
  router.post("/admin/login", controller.admin.main.isLoginedIn);
};
