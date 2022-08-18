const Router = require("express");
const router = new Router();
const authController = require("./controller/authController");
const collectionsController = require("./controller/collectionsController");

// const { check } = require("express-validator");
// const authMiddleware = require("./middleware/authMiddleware");

//Auth routes
router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.put('/change-status', authController.changeStatus);
router.delete('/delete-user', authController.deleteUser);

//User routes
router.post('/create-collection', collectionsController.create)
router.get('/get-collection/:id', collectionsController.getCollection)
router.get('/get-all-collections', collectionsController.getAllCollections)


module.exports = router;
