const express = require('express')
const templateCrud = require('./templateCrud.utils')


const router = express.Router()

// /api/templates/templateList
router
  .route('/templatelist')
  .get(templateCrud.getAllTemplates)
  

module.exports = router