const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const templateListURL = 'http://172.22.8.142:8080/v2/template/getTemplateListV2';
const templateDetailsURL = 'http://172.22.8.142:8080/v2/template/getTemplateDetails';
const createTemplateURL = 'http://172.22.8.142:8080/v2/template/createTemplate';

const useStubData = process.env.OFFLINE === 'true';

const getAllTemplates = async (req, res) => {
console.log('[GET] all Templates - ')
  try {
    let data;
    let jData;
    if(useStubData) {
      console.log('using stub response');
      data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../stubs/templatelist.stub.json')));
    } else {
      console.log('request - calling templateListURL');
      const jsonData = JSON.stringify(req.body);

      const getTemplates = await fetch(templateListURL, {
        method: "POST",
        body: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      })
      data = await getTemplates.text()
      debugger
      const stringifyData = JSON.stringify(data)
      jData = await JSON.parse(stringifyData)
      console.log(jData)

    }
    return res.status(200).send(JSON.parse(jData));
  } catch (err) {
      console.error(err)
      return res.status(400)
    }
}

const getOneTemplate = async (req, res) => {
  try {
    let template;
    if(!useStubData) {
      const getOneTemplate = await fetch(`${templateDetailsURL}/${req.query.id}`)
      template = await getOneTemplate.json()
    } else {
      template = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../stubs/templatedetails.stub.json')));
    }
    res.status(200).send(template)
  } catch (err) {
    console.error(err)
    res.status(400)
  }
}

const createTemplate = async (req, res) => {
  try {
    const newTemplate = await fetch(createTemplateURL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    res.status(201).send({ message: "Template created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

module.exports = {
  getAllTemplates,
  getOneTemplate,
  createTemplate
}
