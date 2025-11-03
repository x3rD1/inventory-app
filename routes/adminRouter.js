const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controllers/adminController");

adminRouter.post("/", adminController.adminPost);
adminRouter.get("/room", adminController.adminPage);
adminRouter.post("/room/add", adminController.addAnime);
adminRouter.post("/room/update/:id", adminController.updateAnime);
adminRouter.post("/room/delete/:id", adminController.deleteAnime);

module.exports = adminRouter;
