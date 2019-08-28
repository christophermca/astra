const request = require("request");
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// because of how are network is setup in office the final number in the ip
// address is subject to change
const dynamicAddress = '8.142';
const JavaEngineIP = `http://172.22.${dynamicAddress}:8080`

const templateListURL = `${JavaEngineIP}/v2/template/getTemplateList/1`;
const templateDetailsURL = `${JavaEngineIP}/v2/template/getTemplateDetails`;
const createTemplateURL = `${JavaEngineIP}/v2/template/createTemplatev2`;
const debugEndpoint = 'https://ptsv2.com/t/mwz5g-1566870939/post'

const useStubData = process.env.OFFLINE === 'true';

const getAllTemplates = async (req, res) => {
  console.log('[GET] all Templates - ')
  try {
    if(useStubData) {
      console.log('using stub response');
      const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../stubs/templatelist.stub.json')));
      res.status(200).send(data);
    } else {
      console.log('request - calling templateListURL');

      const templateList = request(templateListUrl);
      req.pipe(templateList).pipe(res);

    }
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

// simular to running http.serverRequest
const createTemplate = async (req, res) => {

  try {
    if(useStubData) {
      console.log('using stub response');
      template = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../stubs/templatedetails.stub.json')));
      res.status(200).send(template);
    } else {
      const create = request(createTemplateURL);
      req.pipe(create).pipe(res);
    }


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
