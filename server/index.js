const express = require('express');
const cors = require('cors');

const templateRouter = require('./resources/template/template.router')

const app = express()
const PORT = 3002

app.use(cors())
app.use(express.json())

app.use('/api/templates', templateRouter);


app.listen(PORT, () => console.log(`Proxy Server running on ${PORT}`));
