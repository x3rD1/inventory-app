const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");

loginRouter.get("/", loginController.login);
loginRouter.get("/admin", loginController.adminPage);
loginRouter.post("/admin", loginController.adminPost);
module.exports = loginRouter;
