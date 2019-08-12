const fetch = require("node-fetch");
// const FormData = require("form-data");

const uploadFilesURL =
  "http://172.22.8.151:8080/v2/template/uploadMultipleFiles";

const upload = async (req, res) => {
  try {
    const filesToUpload = req.files
    let uploadFile = await fetch(uploadFilesURL, {
      method: "POST",
      body: filesToUpload
    });
    res.status(201).send({ filesToUpload });
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

module.exports = {
  upload
}
