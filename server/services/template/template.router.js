const express = require("express");
const templateCrud = require("./templateCrud.utils");

const router = express.Router();

// /api/templates/templatelist
router.route("/templatelist/")
  .post(templateCrud.getAllTemplates);

// /api/templates/templatedetails
router.route("/templatedetails*")
  .get(templateCrud.getOneTemplate);

// /api/templates/createtemplate
router.route("/createtemplate/*")
  .post(templateCrud.createTemplate);

module.exports = router;
