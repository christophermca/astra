import React from 'react';
import { TemplateResponse, TemplateCreation } from '../Components';
import './styles/createView.css'
import View from './View.jsx'

export default class CreateView extends View {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props)
  }

  render() {
    return (
        <section className="component">
          <TemplateCreation />
          {this.state.templateData ?
            <TemplateResponse /> : ''
          }
        </section>
    );
  }
}

