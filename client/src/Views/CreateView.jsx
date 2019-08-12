import React from 'react';
import { TemplateResponse, TemplateCreation } from '../Components';
import './styles/createView.css'
import View from './View.jsx'

export default class CreateView extends View {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props)
    this.handleSubmit = this.handleSubmit.bind(this);

    window.addEventListener('templateData', (data) => this.setTemplateData(data));
  }

  getTemplateData() {
    fetch('/api/templates/createtemplate/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        const event = new Event('templateData', data)
        window.dispatchEvent(event);
      })
  }

  saveTemplate() {
    fetch('/api/templates/save', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res =>
      console.log(`saving template responded with ${res.status}`)
    )
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (!this.state.templateData) {
      this.getTemplateData();
    } else {
      this.saveTemplate();
    }
  }

  render() {
    return (
        <section className="component">
          <TemplateCreation />
          {this.state.templateData ?
            <TemplateResponse props={this.state.templateData}/> : ''
          }
          <section id="template-button">
            <button onClick={this.handleSubmit} type="submit">Send</button>
          </section>
        </section>
    );
  }
}

