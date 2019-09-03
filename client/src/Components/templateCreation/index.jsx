import React from "react";
import Dropdown from "./dropdown.jsx";
import TemplateBuilder from './templateBuilder.jsx';
import "./style.css";
import { profileConfig, responseStub as stubData } from './stubs/index'
import StatefullAccordian from "../shared/statefullaccordian";
import { ViewContext } from '../../Views/context.js'


export default class TemplateCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleConfigChange = this.handleConfigChange.bind(this);
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

    this.setState({'showTemplateBuilder': true})

  }


  submitDataFile(evt) {
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
      <ViewContext.Consumer>
          {({ createTempl }) => {
            return (
              <form id="create-template" onSubmit={createTempl}>
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
                  {this.state.showTemplateBuilder && <TemplateBuilder config={this.state.config} />}
                </main>
              </form>
                )
            }
        }
      </ViewContext.Consumer>
    );
  }
}
