const Tweet = require("../model/Tweet.js");
const tweetsController = async (req, res) => {
  try {
    const { content, image = "" } = req.body;
    if (!content) {
      return res.status(404).send({ mesage: "Please Write Content" });
    }
    const tweet = await Tweet.create({
      content,
      tweetedBy: req.user.id,
      image,
    });
    if (!tweet) {
      return res.status(404).send({ message: "Data Not Found" });
    }
    res.status(200).send({ message: "successfully Submitted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const likesController = async (req, res) => {
  try {
    const userId = req.user.id;
    const tweetId = req.params.id;
    console.log(tweetId);

    // Check if the tweet is already liked by the user
    const existingLike = await Tweet.findOne({ _id: tweetId, likes: userId });
    if (existingLike) {
      return res
        .status(400)
        .json({ success: false, message: "Tweet already liked by the user" });
    }

    // Add the user's id to the likes array in the tweet document
    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $push: { likes: userId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Tweet liked successfully",
      tweet: updatedTweet,
    });
  } catch (error) {
    console.error("Error in likeTweet:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const unlikesController = async (req, res) => {
  try {
    const userId = req.user.id;
    const tweetId = req.params.id;
    console.log(tweetId);

    // Check if the tweet is already liked by the user
    const existingLike = await Tweet.findOne({ _id: tweetId, likes: userId });
    if (!existingLike) {
      return res
        .status(400)
        .json({ success: false, message: "Tweet is not liked by the user" });
    }

    // Add the user's id to the likes array in the tweet document
    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $pull: { likes: userId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Tweet liked successfully",
      tweet: updatedTweet,
    });
  } catch (error) {
    console.error("Error in likeTweet:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const replyController = async (req, res) => {
  try {
    const userId = req.user.id;
    const parentTweetId = req.params.id;
    const { content } = req.body;

    // Create a new tweet for the reply
    const replyTweet = new Tweet({
      content,
      tweetedBy: userId,
    });

    // Save the new reply tweet to the DB
    const savedReplyTweet = await replyTweet.save();

    // Add the reply tweet id to the parent tweet's replies array
    const parentTweet = await Tweet.findByIdAndUpdate(
      parentTweetId,
      { $push: { replies: savedReplyTweet._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reply posted successfully",
      replyTweet: savedReplyTweet,
      parentTweet,
    });
  } catch (error) {
    console.error("Error in replyController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const singleTweetController = async (req, res) => {
  try {
    const tweetId = req.params.id;
    //find the tweet by id and poppulate withrefrence
    const tweet = await Tweet.findById(tweetId)
      .populate("tweetedBy", "-password")
      .populate({
        path: "likes",
        model: "User",
        select: "-paasowrd",
      })
      .populate({
        path: "comments.commentedBy",
        model: "User",
        select: "-password",
      })

      .populate({
        path: "retweetBy.user",
        model: "User",
        select: "-password",
      })
      .populate("replies", "-likes -retweetBy -replies");

    if (tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }
    res.status(200).json({ success: true, tweet });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const multipleTweetController = async (req, res) => {
  try {
    // Find all tweets, populate fields with references, and sort by createdAt in descending order
    const tweets = await Tweet.find()
      .populate("tweetedBy", "-password") // Exclude user password
      .populate({
        path: "likes",
        model: "User",
        select: "-password", // Exclude user password
      })
      .populate({
        path: "comments.commentedBy",
        model: "User",
        select: "-password", // Exclude user password
      })
      .populate({
        path: "retweetBy.user",
        model: "User",
        select: "-password", // Exclude user password
      })
      .populate("replies", "-likes -retweetBy -replies") // Exclude unnecessary fields from replies
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    res.status(200).json({ success: true, tweets });
  } catch (error) {
    console.error("Error in getAllTweetsController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteTweetController = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user._id;

    // Check if the tweet exists
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    // Check if the logged-in user is the one who created the tweet
    if (userId.toString() !== tweet.tweetedBy.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete this tweet" });
    }

    // Delete the tweet
    await Tweet.findByIdAndDelete(tweetId);

    res
      .status(200)
      .json({ success: true, message: "Tweet deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTweetController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const retweetController = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user._id;

    // Check if the tweet exists
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    // Check if the user has already retweeted the tweet
    const hasRetweeted = tweet.retweetBy.some(
      (user) => user.toString() === userId.toString()
    );
    if (hasRetweeted) {
      return res.status(400).json({
        success: false,
        message: "You have already retweeted this tweet",
      });
    }

    // Add the user's id to the retweetBy array in the tweet document
    tweet.retweetBy.push({ user: userId });
    await tweet.save();

    res
      .status(200)
      .json({ success: true, message: "Tweet retweeted successfully", tweet });
  } catch (error) {
    console.error("Error in retweetController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  tweetsController,
  likesController,
  unlikesController,
  replyController,
  deleteTweetController,
  singleTweetController,
  multipleTweetController,
  retweetController,
};
