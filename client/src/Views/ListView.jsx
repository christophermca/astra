import React from 'react';
import { CardComponent } from '../Components';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props)
  }

  componentDidMount() {
    fetch('/api/templates/templateList', { headers: { accepts: 'application/json' } })
      .then(response => response.json())
      .then(json =>  this.setState({"list": json }))
    }

  render() {
        return (
          <React.Fragment>
            <section className="component" name="cardComponent">
              { this.state.list
                ? this.state.list.map(item => {
                  return (<CardComponent key={item.templateId} data={item} />)})
                : ''
              }
            </section>
        </React.Fragment>
        );
  }
}
