const fetch = require('node-fetch');
const request = require("request");
const fs = require('fs');

const executeAssertionsURL =
  "http://172.22.8.142:8080/v2/template/executeTemplate";


const debugEndpoint = 'https://ptsv2.com/t/pa4xv-1566760918/post'

// simular to running http.serverRequest
const execute = (req, res) => {
  try {
    const executeAssertions = request(executeAssertionsURL);
    req.pipe(executeAssertions).pipe(res);
    //const executeTemplate = fetch(executeAssertionsURL, {method: 'POST', body: req}).then(resp => resp)

  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

module.exports = {
  execute
}