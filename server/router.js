const Router = require("express");
const router = new Router();
const multer = require("multer");
const authController = require("./controller/authController");
const collectionsController = require("./controller/collectionsController");
const imageController = require("./controller/imageController");

// const { check } = require("express-validator");
// const authMiddleware = require("./middleware/authMiddleware");

//Auth routes
router.post("/user/registration", authController.registration);
router.post("/user/login", authController.login);
router.get("/user", authController.getAllUsers);
router.get("/user/:id", authController.getUser);
router.put("/user/:id/change-status", authController.changeStatus);
router.delete("/user/:id/delete", authController.deleteUser);

//User routes
router.post("/collection/:username/create", collectionsController.create);
router.get("/collection/:id", collectionsController.getCollection);
router.get("/collection", collectionsController.getAllCollections);
router.get("/collection/:username", collectionsController.getUsersCollections);
router.put("/collection/:id/update", collectionsController.updateCollection);
router.delete("/collection/:id/delete", collectionsController.deleteCollection);

//Image routes
router.post("/upload-photo", imageController.uploadImage);
router.get("/get-images", imageController.getAllImages);

//Item router
module.exports = router;
