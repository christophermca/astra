const express = require('express')
const templateCrud = require('./templateCrud.utils')


const router = express.Router()

// /api/templates/templatelist
router
  .route('/templatelist')
  .get(templateCrud.getAllTemplates)

// /api/templates/templatedetails
router
  .route('/templatedetails')
  .get(templateCrud.getOneTemplate)



module.exports = router