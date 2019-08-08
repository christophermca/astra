const fetch = require('node-fetch')

const templateListURL = 'http://172.22.8.151:8080/v2/template/getTemplateList/1'

const getAllTemplates = async (req, res) => {
  try {
    const getTemplates = await fetch(templateListURL);
    const data = await getTemplates.json()
      res.send (data)
  } catch (err) {
      console.error(err)
      res.status(400)
    }
}

module.exports = {
  getAllTemplates
}