const express = require("express");
const { authUserMiddleware } = require("../middlewares/authMiddleware");
const {
  tweetsController,
  likesController,
  unlikesController,
  replyController,
  deleteTweetController,
  singleTweetController,
  multipleTweetController,
  retweetController,
  singleAuthProfileController,
  controllerCheckLikeUnlike,
  commentsController,
  singleTweetsController,
} = require("../controller/tweets");
const router = express.Router();

//add content in the tweet database
router.post("/tweets", authUserMiddleware, tweetsController);

//like a tweets
router.put("/likes/:id", authUserMiddleware, likesController);

//unlikes a tweets

router.put("/unlikes/:id", authUserMiddleware, unlikesController);
//check user is like or not
router.get("/check-like/:id", authUserMiddleware, controllerCheckLikeUnlike);
//reply to a tweet
router.put("/reply/:id", authUserMiddleware, replyController);

//single tweet route
router.get("/single-tweet/:id", authUserMiddleware, singleTweetController);

//single profile users
router.get("/profile-data", authUserMiddleware, singleAuthProfileController);
//multiple tweet route
router.get("/multiple-tweets", authUserMiddleware, multipleTweetController);

//delete tweet route
router.delete("/delete-tweets/:id", authUserMiddleware, deleteTweetController);

//retweetby route
// In your routes file
router.put("/retweet/:id", authUserMiddleware, retweetController);

//comments
router.put("/comments/:id", authUserMiddleware, commentsController);

//fetch single tweet
router.get("/singletweet/:id", authUserMiddleware, singleTweetsController);
module.exports = router;
