const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authjwt, verifyReg } = require("../middlewares");
const { isProvider } = require("../middlewares/authjwt");

router.post(
  "/create",
  [authjwt.verifyToken, authjwt.isAdmin, verifyReg.checkRolesExisted],
  userController.createUser
);

router.get(
  '/',
  [authjwt.verifyToken, authjwt.isAdmin],
  userController.getUsers
);

router.get('/info', [authjwt.verifyToken], userController.getInfo)

module.exports = router;
