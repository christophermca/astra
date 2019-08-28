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

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('creating template')
    const form = evt.target;
    const formData = new FormData(form)

    formData.append('active', true);
    formData.append('template', JSON.stringify({
      "templateName":formData.get('templateName'),
      "httpUrlPathParams": formData.get('httpUrlPathParams'),
      "requestType": this.state.config.method})
    );

    const options = {
      method: "POST",
      body: formData
    }

    fetch('/api/templates/create', options).then(response => response.json())
      .then(json => this.setState({"details": json.template}))
      .catch(err => console.error({ err }));
  }

  handleSubmit2(evt) {
    evt.preventDefault();
    console.log('creating template')
    const form = evt.target;
    const formData = new FormData(form)

    formData.append('active', true);
    formData.append('templateId', 1);

    const options = {
      method: "POST",
      body: formData
    }

    fetch('/api/upload/files', options).then(response => response.json())
      .then(json => json)
      .catch(err => console.error({ err }));
  }

  render() {
    return (
      <div>
        <form id="create-template" onSubmit={this.handleSubmit}>
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
                  <input name="requestType" disabled placeholder={this.state.config.method} />
                  <input name="httpUrlPathParams" defaultValue={this.state.config.url} className="template-url" />
                </section>
                <section>
                  <aside className="meta-info">
                    <div>{stubData.api}</div>
                  </aside>
                  <input
                    name="files"
                    id="input-file"
                    type="file"
                    accept=".csv,.xls "
                    multiple
                    onChange={this.uploadFile}
                  />
                  <section id="template-button">
                    <button type="submit">Send</button>
                  </section>
                </section>
              </React.Fragment>
            ) : ''
            }
          </main>
        </form>
        {
          this.state.details ?
          (
              <TemplateResponse data={this.state.details}/>
          ) : ''
        }
      </div>
    );
  }
}
