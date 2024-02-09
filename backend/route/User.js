const { authUserMiddleware } = require("../middlewares/authMiddleware");
const {
  singleUserController,
  followController,
  unfollowController,
  editUserDetailsController,
} = require("../controller/User.js");
const express = require("express");
const router = express.Router();
//single user data
router.get("/single_user/:id", singleUserController);

//follow use data
router.get("/follow/:id", authUserMiddleware, followController);

//unfollow user
router.get("/unfollow/:id", authUserMiddleware, unfollowController);

//edit user details
router.get("/edit-details", authUserMiddleware, editUserDetailsController);
module.exports = router;
