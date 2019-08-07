import React from 'react';
import Dropdown from './dropdown.jsx';
import Button from './button.jsx'
import './style.css';
import * as stubData from './stubData.json'

export default class TemplateCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props, stubData);
  }

  render() {
    return (
      <form>
        <section id="template-header">
            <input placeholder="Template Name *Required" required />
            <input placeholder="Template Description *Required" required />
        </section>
        <section id="template-config">
          <Dropdown name="service" data={stubData.services}/>
          <Dropdown name="environemt" data={stubData.environment}/>
          <Dropdown name="configuration" data={stubData.configuration}/>
          <Dropdown name="method" />
        </section>
        <section id="template-button">
          <Button />
        </section>
      </form>
    )
  }
}
