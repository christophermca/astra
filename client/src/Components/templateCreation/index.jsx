import React from "react";
import Dropdown from "./dropdown.jsx";
import Builder from './builder.jsx'
import "./style.css";
import { profileConfig, responseStub as stubData } from '../../Stubs/ProfileService'
import {TemplateResponse} from '../index.js'

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
        this.setState({ 'config': profileConfig['bravo'] })
        break;
      default:
        // Does nothing
    }

    this.setState({'showTemplateBuilder': true})

  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(!this.state.showTemplateDetails) {
      console.log('[CREATE template]');
      fetch(`/api/templates/templatedetails?id=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(json => this.setState({'details': json, "showTemplateDetails": true}))
    } else {
      console.log('[SAVE template]');
    }
  }

  render() {
    console.log(this.state.details)
    return (
      <form>
        <section id="template-header">
          <input placeholder="Template Name *Required" required />
          <input placeholder="Template Description *Required" required />
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
              <Builder config={this.state.config} handleSubmit={this.handleSubmit}/>
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
