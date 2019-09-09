const request = require("request");
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const {IP: dynamicAddress} = require('../../config.js')

// because of how are network is setup in office the final number in the ip
// address is subject to change
const JavaEngineIP = `http://172.22.${dynamicAddress}:8080/v2`
const templateListURL = `${JavaEngineIP}/template/getTemplateList`;
const templateDetailsURL = `${JavaEngineIP}/template/getTemplateDetails`;
const createTemplateURL = `${JavaEngineIP}/template/createTemplate`;
const executeEndpoint = `${JavaEngineIP}/template/executeTemplate`;

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
      const templateList = request(templateListURL);
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

const execute = (req, res) => {
  try {
    const executedCard = request(executeEndpoint);
    req.pipe(executedCard).pipe(res);

  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

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
  createTemplate,
  execute
}
