const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express()
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`Proxy Server running on ${PORT}`));

/** Handle Creating Template
 * TODO: Create Resources directory
 *      * Create Template Resource
 *          T̶O̶D̶O̶:̶ C̶r̶e̶a̶t̶e̶ t̶e̶m̶p̶l̶a̶t̶e̶.̶c̶o̶n̶t̶r̶o̶l̶l̶e̶r̶/̶r̶o̶u̶t̶e̶r̶/̶m̶o̶d̶e̶l̶.̶j̶s̶ f̶i̶l̶e̶s̶
 *          TODO: In template.router.js file, create a POST call that will return a success status code and message
 *      * Create Flow Resource
 *      * Create Suite Resource
 *      * Create Report Resource
 * TODO: Create utils directory
 *      * Add createOne Function
 *      * Add getAll Function
 * TODO: Import new Routes to index.js
 */