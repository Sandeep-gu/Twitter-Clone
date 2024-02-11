const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const fileDetails = {
    filename: req.file.filename,
    path: req.file.path,
    url: `${req.protocol}://${req.get("host")}/${req.file.path}`,
  };
  res.status(200).json({ success: true, file: fileDetails });
});

module.exports = router;
