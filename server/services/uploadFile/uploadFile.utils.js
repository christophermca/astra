const fetch = require("node-fetch");
const FormData = require("form-data");
const form = new FormData();

const uploadFilesURL =
  "http://172.22.8.142:8080/v2/template/uploadMultipleFiles";

const downloadFilesURL =
  "http://172.22.8.142:8080/v2/template/FileDownload";

const debugEndpoint = 'https://postman-echo.com/post'

const upload = async (req, res) => {
  try {
    req.setEncoding('utf8');
    form.append('templateId', 1);
    form.append('files', req.body.files)

    const request = await fetch(debugEndpoint, {
      method: "POST",
      headers: form.getHeaders(),
      body: form
    }).then(res => res.json())

    res.send(request)


    // const jd = await uploadFile.json()
    // res.status(200).send(jd);

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
