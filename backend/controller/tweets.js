const Tweet = require("../model/Tweet.js");
const User = require("../model/User.js");
const { ObjectId } = require("mongodb");
const tweetsController = async (req, res) => {
  try {
    const { content, image } = req.body;
    console.log(image);
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
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const likesController = async (req, res) => {
  try {
    const userId = req.user.id;
    const tweetId = req.params.id;

    console.log("tweetId", tweetId);

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
      message: "Tweet unliked successfully",
      tweet: updatedTweet,
    });
  } catch (error) {
    console.error("Error in unlikeTweet:", error);
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
    console.log(tweetId);
    //find the tweet by id and poppulate withrefrence
    const tweet = await Tweet.find({ tweetedBy: tweetId })
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
    console.log("tweetsingle", tweet);
    const tweetedUser = await User.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }
    res.status(200).json({ success: true, tweet, tweetedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const singleTweetsController = async (req, res) => {
  try {
    const tweetId = req.params.id;
    console.log(tweetId);
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
        path: "retweetBy",
        model: "User",
        select: "-password",
      })
      .populate({
        path: "replies",
        model: "Tweet",
        populate: {
          path: "tweetedBy",
          model: "User",
          select: "-password",
        },
      });
    console.log("tweetsingle", tweet);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }
    res.status(200).send({ success: true, tweet });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const singleAuthProfileController = async (req, res) => {
  try {
    const tweetId = req.user.id;
    // console.log(tweetId);
    //find the tweet by id and poppulate withrefrence
    const tweet = await Tweet.find({ tweetedBy: tweetId })
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
        path: "retweetBy",
        model: "User",
        select: "-password",
      })
      .populate("replies", "-likes -retweetBy -replies");

    // console.log(tweet);

    if (!tweet) {
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
        path: "retweetBy",
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
    console.log("tweetId1", req.params.id);
    const tweetId = req.params.id;
    const userId = req.user.id;

    // Check if the tweet exists
    const tweet = await Tweet.findById(tweetId).populate("tweetedBy");
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    // Check if the logged-in user is the one who created the tweet
    console.log(tweet);
    const objectId1 = new ObjectId(userId);
    const objectId2 = new ObjectId(tweet.tweetedBy._id);
    if (!objectId1.equals(objectId2)) {
      return res
        .status(200)
        .send({ success: false, message: "Unauthorized to delete this tweet" });
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
    console.log("retweetId", req.params.id);
    const tweetId = req.params.id;
    const userId = req.user.id;

    // Check if the tweet exists
    const tweet = await Tweet.findById(tweetId);
    console.log(tweet);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    // Check if the user has already retweeted the tweet
    // const hasRetweeted = tweet.retweetBy.some(
    //   (user) => user.toString() === userId.toString()
    // );
    // if (hasRetweeted) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You have already retweeted this tweet",
    //   });
    // }
    if (tweet.retweetBy.includes(userId)) {
      return res
        .status(200)
        .send({ success: false, message: "You have already retweeted" });
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $push: { retweetBy: userId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Tweet retweeted successfully",
      updatedTweet,
    });
  } catch (error) {
    console.error("Error in retweetController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const controllerCheckLikeUnlike = async (req, res) => {
  try {
    // console.log("likeid", req.params.id);
    const tweet = await Tweet.findById(req.params.id);
    // console.log("tweet", tweet);
    if (!tweet) {
      return res.status(404).send({ message: "Tweet is not found" });
    }
    if (!tweet.likes.includes(req.user.id)) {
      return res
        .status(200)
        .send({ success: false, message: "not liked user" });
    }
    return res.status(200).send({ success: true, message: "liked" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const commentsController = async (req, res) => {
  try {
    const { comment } = req.body;
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).send({ message: "Tweet Not Found" });
    }
    const newComment = {
      content: comment,
      commentedBy: req.user.id,
    };

    tweet.comments.push(newComment);
    await tweet.save();

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = {
  tweetsController,
  controllerCheckLikeUnlike,
  likesController,
  unlikesController,
  replyController,
  deleteTweetController,
  singleTweetController,
  multipleTweetController,
  retweetController,
  singleAuthProfileController,
  commentsController,
  singleTweetsController,
};
