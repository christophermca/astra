const fetch = require("node-fetch");
const request = require("request");
const fs = require("fs");

const executeAssertionsURL =
  "http://172.22.8.142:8080/v2/template/saveandexecuteTemplate";

const debugEndpoint = "https://ptsv2.com/t/pa4xv-1566760918/post";

// simular to running http.serverRequest
const execute = async (req, res) => {
  try {
    // const executeAssertions = request(executeAssertionsURL);
    // req.pipe(executeAssertions).pipe(res);
    // console.log(res)
    const jsonData = JSON.stringify(req.body);
 
    let data;
    let parsed;

    const getTemplates = await fetch(executeAssertionsURL, {
      method: "POST",
      body: jsonData,
      headers: {
        "Content-Type": "application/json"
      }
    });
    data = await getTemplates.text();

    stringData = JSON.stringify(data)
    parsed = JSON.parse(stringData);
    res.status(200).send(parsed);
    //const executeTemplate = fetch(executeAssertionsURL, {method: 'POST', body: req}).then(resp => resp)
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

module.exports = {
  execute
};
