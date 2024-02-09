const User = require("../model/User.js");
const {
  passwordEncryption,
  idEncryption,
} = require("../utils/Authorization.js");
const bcrypt = require("bcrypt");
//register user details
const registerController = async (req, res) => {
  try {
    const { name, location, dob, username, password, profilepicture, email } =
      req.body;

    if (!name || !location || !dob || !username || !password || !email) {
      res.status(400).send({ message: "Please enter all details" });
      return;
    }

    const emailExists = await User.find({ email: email });
    if (emailExists.length > 0) {
      res.status(400).send({ message: "Email already exists" });
      return;
    }

    const headerPassword = await passwordEncryption(password);
    if (!headerPassword) {
      res.status(500).send({ message: "Error encrypting password" });
      return;
    }

    const result = await User.create({
      email,
      name,
      password: headerPassword,
      username,
      dob,
      profilepicture: profilepicture || "", // Use default value if not provided
    });

    res.status(201).send({ message: "Successfully registered", result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Incorrect password" });
    }
    const token = await idEncryption(user._id);
    const data = {
      name: user.name,
      location: user.location,
      email: user.email,
      profilepicture: user.profilepicture,
      dob: user.DOB,
      token,
      username: user.username,
    };
    res.status(200).send({ message: "Login successful", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//login authorization user
module.exports = { registerController, loginController };
