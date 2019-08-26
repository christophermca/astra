const fetch = require('node-fetch');
const request = require("request");
const fs = require('fs');

const uploadFilesURL =
  "http://172.22.9.24:8080/v2/template/uploadMultipleFiles";

const downloadFilesURL =
  "http://172.22.9.24:8080/v2/template/FileDownload";

const debugEndpoint = 'https://ptsv2.com/t/pa4xv-1566760918/post'

// simular to running http.serverRequest
const upload = (req, res) => {

  try {
    //const uploadForm = request(debugEndpoint);
    //req.pipe(uploadForm).pipe(res);
    const uploadForm = fetch(debugEndpoint, {method: 'POST', body: req}).then(resp => resp)

    req.pipe(uploadForm).pipe(res);

  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

const download = async (req, res) => {
  try {
    // TODO update fetch to request ?
    const downloadFiles = await fetch(downloadFilesURL)
    const files = await downloadFiles.json(req.files)
    res.send(files)
    } catch (err) {
      console.error(err);
      res.status(400);
    }
  }


module.exports = {
  upload,
  download
}
