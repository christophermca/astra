import React from 'react';
import { TemplateResponse } from '../Components';
import { Link } from "react-router-dom";
import View from './View.jsx'

export default class DetailsView extends View {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
  }

  componentDidMount() {
    fetch(`/api/templates/templatedetails?id=${(this.state.match.params.id.length > 3) ? 1 : this.state.match.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => this.setState({'details': json}))
  }

  render() {
    return (
      <div>
      { this.state.details ?
            <section className="component">
              <TemplateResponse data={this.state.details} />
            </section> : ''}
      </div>
    );
  }
}

