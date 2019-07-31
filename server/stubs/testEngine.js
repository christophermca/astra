const fs = require('fs');
const path = require('path');

class TestEngine {
  getUserData() {
    return new Promise((resolve, reject) => {
     fs.readFile(path.resolve(__dirname, './userData.json'), "utf8", (err, data) => {
        resolve(data);
      });
    });

  };
}

module.exports = TestEngine;
