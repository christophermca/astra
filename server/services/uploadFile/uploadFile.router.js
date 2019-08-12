const express = require("express");
const uploadUtils = require('./uploadFile.utils');

const router = express.Router();

//* /api/files/upload

router
    .route('/upload')
    .post(uploadUtils.upload)
module.exports = router;
