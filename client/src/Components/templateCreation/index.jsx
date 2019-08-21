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
    //this.handleSubmit = this.handleSubmit.bind(this);
    window.addEventListener('fileUpload', (data) => {
      debugger
      return;
    });
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
    }

    this.setState({'api': ['rest'], 'showTemplateBuilder': true})

  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(!this.state.showTemplateDetails) {
      console.log('[CREATE template]');
      //const options = {method: 'POST', "headers": {"Content-Type": "multipart/form-data"}}
      //fetch('/api/files/upload', options)
      // fetch(`/api/templates/templatedetails?id=1`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      // .then(resp => resp.json())
      // .then(json => this.setState({'details': json, "showTemplateDetails": true}))
    } else {
      console.log('[SAVE template]');
    }
  }

  render() {
    console.log(this.state.details)
    return (
      <form action="/api/files/upload" method="POST" enctype="multipart/form-data" >
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
                <input
                  name="files"
                  id="input-file"
                  type="file"
                  accept=".csv,.xls "
                  multiple
                />
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
