const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
const passwordEncryption = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error in passwordEncryption:", error);
    throw error;
  }
};

const idEncryption = async (id) => {
  try {
    const token = await JWT.sign({ id }, process.env.SECRETE_KEY);
    return token;
  } catch (error) {
    console.error("Error in idEncryption:", error);
    throw error;
  }
};

module.exports = { passwordEncryption, idEncryption };
