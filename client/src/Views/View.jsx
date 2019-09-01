import React from 'react';

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
    this.setTemplateData = this.setTemplateData.bind(this)
  }
    setTemplateData(data) {
      this.setState({'templateData': data})
    }

}

