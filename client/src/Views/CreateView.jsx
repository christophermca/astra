import React from 'react';
import { TemplateResponse, TemplateCreation } from '../Components';
import './styles/createView.css'

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props)
  }

  render() {
    return (
        <section className="component" name="cardComponent">
          <TemplateCreation />
          {this.state.templateData ?
            <TemplateResponse /> : ''
          }
        </section>
    );
  }
}

