const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");

const templateRouter = require("./services/template/template.router");
const uploadRouter = require('./services/uploadFile/uploadFile.router')

const app = express();
const PORT = 3002;

app.use(morgan('dev'))

app.use("/api/templates", templateRouter);
app.use("/api/files", uploadRouter);

app.listen(PORT, () => console.log(`Proxy Server running on ${PORT}`));
