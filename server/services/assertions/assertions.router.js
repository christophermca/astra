const express = require("express");
const { execute } = require("./assertions.utils");

const router = express.Router();


router.route("/execute").post(execute);


module.exports = router;
