const express = require("express");
const templateCrud = require("./templateCrud.utils");

const router = express.Router();

router.route("/templatelist/")
  .post(templateCrud.getAllTemplates);

router.route("/templatedetails*")
  .get(templateCrud.getOneTemplate);

router.route("/create")
  .post(templateCrud.createTemplate);

router.route("/save")
  .put(templateCrud.saveTemplate)
  .get(templateCrud.getAllTemplates)

  router.route("/execute")
  .post(templateCrud.execute);

module.exports = router;
