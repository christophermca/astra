const express = require("express");
const templateCrud = require("./templateCrud.utils");

const router = express.Router();

router.route("/templatelist/")
  .get(templateCrud.getAllTemplates);

router.route("/templatedetails*")
  .get(templateCrud.getOneTemplate);

router.route("/create")
  .post(templateCrud.createTemplate);

module.exports = router;
