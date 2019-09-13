const fetch = require('node-fetch');
const request = require("request");
const {IP: dynamicAddress} = require('../../config.js');
const JavaEngineIP = `http://172.22.${dynamicAddress}:8080/v2`;

// TODO verify create endpoint
const createTemplate = `${JavaEngineIP}/template/createTemplatev2`;
const uploadFilesURL = `${JavaEngineIP}/template/uploadMultipleFiles`;
const downloadFilesURL = `${JavaEngineIP}/template/FileDownload`;


// simular to running http.serverRequest
const upload = (req, res) => {
  try {
    const uploadForm = request(uploadFilesURL);
    req.pipe(uploadForm).pipe(res);

  } catch (err) {
    console.error(err);
    res.status(400);
  }
};


const download = (req, res) => {
  try {
    const downloadFile = request(downloadFilesURL);
    req.pipe(downloadFile).pipe(res);

    } catch (err) {
      console.error(err);
      res.status(400);
    }
  };


module.exports = {
  upload,
  download,
};
