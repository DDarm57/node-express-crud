const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

const userController = require("../controller/user");
router.route("/user").get(userController.index).post(userController.store);
router.get("/user/create", userController.create);

router.get("/user/:id", userController.edit);
router.post("/user/update/:id", userController.update);

router.post("/user/:userId", userController.delete);

module.exports = router;
