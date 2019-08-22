import React from "react";
import Dropdown from "./dropdown.jsx";
import TemplateBody from './templatebody.jsx';
import "./style.css";
import { profileConfig, responseStub as stubData } from './stubs/index'
import {TemplateResponse} from '../index.js'
import StatefullAccordian from "../shared/statefullaccordian";


export default class TemplateCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mockTemplateResponse = this.mockTemplateResponse.bind(this);
  }

  // TODO logic should be handled by the profile service
  handleConfigChange(evt) {
    switch(evt.target.value) {
      case 'alpha':
        this.setState({ 'config': profileConfig['alpha']})
        break;
      case 'bravo':
        this.setState({ 'config': profileConfig['bravo']})
        break;
      default:
        console.log(`${evt.target.value} does not have a use case` )
    }

    this.setState({'api': ['rest'], 'showTemplateBuilder': true})

  }

  mockTemplateResponse() {
    if(!this.state.showTemplateDetails) {
      console.log('[CREATE template]');

      return fetch(`/api/templates/templatedetails?id=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
        .then(json => this.setState({ 'details': json,
                                      "showTemplateDetails": true}))
    } else {
      console.log('[SAVE template]');
    }

  }

  handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form)
    let data = {}
    for(let [name, value] of formData) {
      data[name] = value;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(formData).toString()
    }

    return fetch('/api/files/upload', options)
      .then(res => res)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <section id="template-header">
          <input name="templateName" placeholder="Template Name *Required" required />
          <input name="description" placeholder="Template Description *Required" required />
        </section>
        <main>
          <section id="template-config" >
            <Dropdown name="service" data={stubData.services} />
            <Dropdown name="environment" data={stubData.environment} />
            <Dropdown name="configuration" data={stubData.configuration} onChange={this.handleConfigChange}/>
          </section>

          {this.state.showTemplateBuilder ?
          (
            <React.Fragment>
              <section id="template-builderHeader">
                <input disabled placeholder={this.state.config.method} />
                <input name="url" defaultValue={this.state.config.url} className="template-url" />
              </section>
              <section>
                <aside className="meta-info">
                  <div>{stubData.api}</div>
                </aside>
                {/* TODO add back TemplateBody component */}
                <input
                  name="files"
                  id="input-file"
                  type="file"
                  accept=".csv,.xls "
                  multiple
                />
            {/*<TemplateBody header={this.state.config.headers}/>*/}
                <section id="template-button">
                  <button type="submit">Send</button>
                </section>
              </section>
            </React.Fragment>
          ) : ''
          }
          {this.state.showTemplateDetails ?
              (
                <TemplateResponse data={this.state.details}/>
              ) : ''
          }
        </main>
      </form>
    );
  }
}
