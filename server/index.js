const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const proxy = express();

proxy.listen(3001, () => console.log("proxy server connected"));
proxy.get("/test", (req, res) =>
  testEngine.getUserData().then(data => res.send(data))
);
