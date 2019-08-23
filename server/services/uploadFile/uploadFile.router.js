const express = require("express");
const { upload, download } = require("./uploadFile.utils");

const router = express.Router();

router.route("/upload").post(upload);

router.route("/download").get(download);

module.exports = router;
