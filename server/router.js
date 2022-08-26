const Router = require("express");
const router = new Router();
const authController = require("./controller/authController");
const collectionsController = require("./controller/collectionsController");
const itemController = require("./controller/itemController");

// const { check } = require("express-validator");
// const authMiddleware = require("./middleware/authMiddleware");

//Auth routes
router.post("/user/registration", authController.registration);
router.post("/user/login", authController.login);
router.get("/user", authController.getAllUsers);
router.get("/user/:id", authController.getUser);
router.put("/user/:id/change-status", authController.changeStatus);
router.delete("/user/:id/delete", authController.deleteUser);

//Colleciton routes
router.post("/collection/create/:username", collectionsController.create);
router.get("/collection/:id", collectionsController.getCollection);
router.get("/collection", collectionsController.getAllCollections);
router.get("/collection/:username", collectionsController.getUsersCollections);
router.put("/collection/:id/update", collectionsController.updateCollection);
router.delete("/collection/:id/delete", collectionsController.deleteCollection);

//Item router
router.post("/item/create/:username/:collectionID", itemController.createItem);

module.exports = router;
