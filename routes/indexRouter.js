const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.index);
indexRouter.get("/search", indexController.search);

module.exports = indexRouter;
