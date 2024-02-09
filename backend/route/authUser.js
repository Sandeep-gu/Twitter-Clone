const express = require("express");
const { validationMiddleware } = require("../middlewares/authMiddleware.js");
const {
  registerController,
  loginController,
} = require("../controller/authUser.js");
const router = express.Router();

//resister user
router.post("/register", registerController);

//login user
router.post("/login", validationMiddleware, loginController);
module.exports = router;
