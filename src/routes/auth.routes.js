const express = require("express");
const router = express.Router();
const controller = require('../controllers/auth.controller')
const { authjwt, verifyReg } = require("../middlewares");

router.post("/login",authjwt.verifyToken, controller.login);

router.post("/register", [verifyReg.checkExist, verifyReg.checkRolesExisted], controller.register);

module.exports = router;