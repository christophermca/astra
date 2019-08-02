import React from 'react';
import './style.css'

export default class TemplateCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props);
  }
  render() {
    return (
      <section id="template-header-input">
        <input placeholder="Template Name *Required" required />
        <input placeholder="Template Description *Required" required />
      </section>
    )
  }
}
