const User = require("../model/User");

//fetch single user data from the database
const singleUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
      .select("-password")
      .populate("following")
      .populate("followers");
    if (!user) {
      res.status(404).send({ message: "data not found" });
      return;
    }
    res.status(200).send({ message: "Successfully data found", user });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

//update follower and following users data
const followController = async (req, res) => {
  try {
    const followId = req.params.id;

    const followUser = await User.findById(followId);
    const LoginUser = await User.findById(req.user.id);

    if (!followUser) {
      return res
        .status(404)
        .json({ success: false, message: "User to follow not found" });
    }

    // Check if the user is already following the target user
    if (LoginUser.following.includes(followId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already following this user" });
    }

    // Update the logged-in user's following array
    LoginUser.following.push(followId);

    // Update the user to follow's followers array
    followUser.followers.push(req.user.id);

    // Save both users
    await LoginUser.save().select("-password", "_id");
    await followUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully followed the user",
      LoginUser,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//update unfollower and unfollowing users
const unfollowController = async (req, res) => {
  try {
    const unfollowId = req.params.id;

    const unfollowUser = await User.findById(unfollowId);
    const loginUser = await User.findById(req.user.id);

    if (req.user.id === unfollowId) {
      res.status(400).send({ message: "User cant unfollowed itself" });
      return;
    }
    if (!loginUser.following.includes(unfollowId)) {
      return res
        .status(400)
        .json({ success: false, message: "Not following this user" });
    }

    loginUser.following = loginUser.following.filter((id) => id !== unfollowId);

    unfollowUser.followers = unfollowUser.followers.filter(
      (id) => id !== req.user.id
    );

    await loginUser.save();
    await unfollowUser.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully unfollowed the user" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//edit user details
const editUserDetailsController = async (req, res) => {
  try {
    console.log(req.body);
    const { dob, location, name, image = "" } = req.body;
    if (!name || !dob || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, dob, and location",
      });
    }
    console.log(req.user.id);
    const userData = await User.findById(req.user.id);
    console.log(userData);
    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }

    userData.name = name;
    userData.DOB = dob;
    userData.location = location;
    userData.profilepicture = image;

    await userData.save();
    console.log("userData", userData);
    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      userData,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//check user folowed are not
const checkFollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      const isFollowing = user.following.includes(req.params.id);
      // console.log(isFollowing);
      if (!isFollowing) {
        return res.status(200).send({ success: false, message: "Not found" });
      }
      return res
        .status(200)
        .send({ success: true, message: "successfully gate" });
    } else {
      return res
        .status(200)
        .send({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  singleUserController,
  followController,
  unfollowController,
  editUserDetailsController,
  checkFollowUser,
};
