import React from 'react';
import { TemplateResponse } from '../Components';

export default class DetailsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    fetch(`/api/templates/templatedetails?id=${(this.props.match.params.id.length > 3) ? 1 : this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => this.setState({'templateData': json.template}))
  }

  render() {
    return (
            <section className="component">
      {this.state.templateData && <TemplateResponse data={this.state.templateData} />}
    </section>
    );
  }
}

