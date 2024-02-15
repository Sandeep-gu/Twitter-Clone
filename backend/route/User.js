const { authUserMiddleware } = require("../middlewares/authMiddleware");
const {
  singleUserController,
  followController,
  unfollowController,
  editUserDetailsController,
  checkFollowUser,
} = require("../controller/User.js");
const express = require("express");
const router = express.Router();
//single user data
router.get("/single_user/:id", singleUserController);

//follow use data
router.put("/follow/:id", authUserMiddleware, followController);

//unfollow user
router.put("/unfollow/:id", authUserMiddleware, unfollowController);

//edit user details
router.put("/edit-details", authUserMiddleware, editUserDetailsController);

//user followed are not'
router.get("/check-follow/:id", authUserMiddleware, checkFollowUser);
module.exports = router;
