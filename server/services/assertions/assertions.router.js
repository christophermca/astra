const express = require("express");
const { upload, download } = require("./assertions.utils");

const router = express.Router();

//* /api/files/upload

router.route("/execute").post(execute);


module.exports = router;
