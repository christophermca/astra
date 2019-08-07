const express = require('express');
const proxy = express();
const TestEngine = require('./stubs/testEngine.js');
const testEngine = new TestEngine();

proxy.listen(3001, () => console.log('proxy server connected'));
proxy.get('/test', (req, res) =>
  testEngine.getUserData().then(data => res.send({'test': true})));
