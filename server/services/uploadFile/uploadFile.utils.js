const fetch = require('node-fetch');
const request = require("request");

// TODO verify create endpoint
const createTemplateSJ =
  "http://172.22.8.142:8080/v2/template/createTemplatev2?templateName=\'testing\'";

const createTemplate =
  "http://172.22.9.24:8080/v2/template/createTemplatev2";

const uploadFilesURL =
  "http://172.22.9.24:8080/v2/template/uploadMultipleFiles";

const downloadFilesURL =
  "http://172.22.9.24:8080/v2/template/FileDownload";

const debugEndpoint = 'https://ptsv2.com/t/55zig-1566827920/post'

// simular to running http.serverRequest
const upload = (req, res) => {

  try {
    const uploadForm = request(createTemplateSJ);
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
