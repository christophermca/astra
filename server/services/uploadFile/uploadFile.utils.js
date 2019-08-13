const fetch = require("node-fetch");
// const FormData = require("form-data");

const uploadFilesURL =
  "http://172.22.8.151:8080/v2/template/uploadMultipleFiles";

const downloadFilesURL =
  "http://172.22.8.151:8080/v2/template/FileDownload";

const upload = async (req, res) => {
  try {
    const filesToUpload = req.body
    let uploadFile = await fetch(uploadFilesURL, {
      "method": "POST",
      "headers": {
        "Content-Type": "multipart/form-data"
      },
      "body": filesToUpload
    });
    console.log(uploadFile);
    res.status(201).send(uploadFile);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

const download = async (req, res) => {
  try {
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
