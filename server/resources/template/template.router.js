const express = require('express')
const templateCrud = require('./templateCrud.utils')


const router = express.Router()

router
  .route('/templatelist')
  .get(templateCrud.getAllTemplates)
  

module.exports = router