const fetch = require("node-fetch");
// const FormData = require("form-data");

const executeAssertionsURL =
  "http://172.22.8.151:8080/v2/template/uploadMultipleFiles";



const execute = async (req, res) => {
  try {
    const assertions = req.body
    let assertionsData = await fetch(executeAssertionsURL, {
      "method": "POST",
      "headers": {
        "Content-Type": "multipart/form-data"
      },
      "body": assertions
    });
    console.log(assertionsData);
    res.status(201).send(assertionsData);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};


module.exports = {
  execute
}
