import React from 'react';
import { TemplateResponse } from '../Components';

export default class DetailsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    debugger
    fetch(`/api/templates/templatedetails?id=${this.props.match.params.id}`, {
      method: 'GET',
    }).then(resp => resp.json())
      .then(json => {
        debugger;
      })
  }

  render() {
    return (
            <section className="component">
      {this.state.templateData && <TemplateResponse data={this.state.templateData} />}
    </section>
    );
  }
}

