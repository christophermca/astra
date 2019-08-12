import React from 'react';
import { TemplateResponse } from '../Components';
import View from './View.jsx'

export default class DetailsView extends View {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
  }

  componentDidMount() {
    const templateDetailsUrl = `/api/templates/templatedetails?id=${
      (this.state.match.params.id.length > 3)
        ? 1
        : this.state.match.params.id
    }`

    fetch(templateDetailsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      this.setState({'templateData': data})
    });
  }

  render() {
      return (<TemplateResponse data={this.state.templateData} />)
  }
}
