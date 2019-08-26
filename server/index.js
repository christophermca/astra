const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");

const templateRouter = require("./services/template/template.router");
const uploadRouter = require('./services/uploadFile/uploadFile.router')
const assertionsRouter = require('./services/assertions/assertions.router')

const app = express();
const PORT = 3002;

app.use(
  fileUpload({
    createParentPath: true
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use("/api/templates", templateRouter);
app.use("/api/files", uploadRouter);
app.use("/api/assertions", assertionsRouter);

app.listen(PORT, () => console.log(`Proxy Server running on ${PORT}`));
