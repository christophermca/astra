import React from 'react';
import { TemplateResponse, TemplateCreation } from '../Components';
import './styles/createView.css';
import View from './View.jsx';

export default class CreateView extends View {
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

