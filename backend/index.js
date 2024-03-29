const express = require("express");
const cors = require("cors");
const mongodbConnection = require("./Database/Db");
const path = require("path");
const authUser = require("./route/authUser.js");
const User = require("./route/User.js");
const Tweets = require("./route/tweet.js");
const files = require("./route/file.js");

require("dotenv").config();
global.__basedir = __dirname;

mongodbConnection();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authUser);
app.use("/api/user", User);
app.use("/api/tweet", Tweets);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/uploads", files);
app.listen(process.env.PORT, () => {
  console.log(`Successfully started at Port ${process.env.PORT}`);
});
