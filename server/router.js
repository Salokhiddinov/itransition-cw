const Router = require("express");
const router = new Router();
const multer = require("multer");
const authController = require("./controller/authController");
const collectionsController = require("./controller/collectionsController");
const imageController = require("./controller/imageController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// const { check } = require("express-validator");
// const authMiddleware = require("./middleware/authMiddleware");

//Auth routes
router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.put("/change-status", authController.changeStatus);
router.delete("/delete-user", authController.deleteUser);
router.get("/get-users", authController.getUsers);
router.get("/get-user", authController.getUser);

//User routes
router.post("/create-collection", collectionsController.create);
router.get("/get-collection/:id", collectionsController.getCollection);
router.get("/get-all-collections", collectionsController.getAllCollections);
router.get(
  "/get-users-collections/:owner",
  collectionsController.getUsersCollections
);
router.put("/update-collection/:id", collectionsController.updateCollection);
router.delete("/delete-collection/:id", collectionsController.deleteCollection);

//Item routes
router.post(
  "/upload-photo", imageController.uploadImage
);
router.get("/get-images", imageController.getAllImages);

module.exports = router;
