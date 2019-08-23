import React from 'react';
import { CardComponent, TemplateResponse } from '../Components';
import { Link } from "react-router-dom";
import View from './View.jsx'

export default class ListView extends View {
  componentDidMount() {
    fetch('/api/templates/templatelist', { headers: { accepts: 'application/json' } })
      .then(response => response.json())
      .then(json =>  this.setState({"list": json }))
    }

  render() {
    return (
      <div>
        <React.Fragment>
          <section className="component" name="card-component">
            <div className="create">
              <button>
                <Link to="/templates/create">Create</Link>
              </button>
            </div>
            { this.state.list
              ? this.state.list.map(item => {
                return (<CardComponent key={item.templateId} data={item} />)})
              : ''
            }
          </section>
        </React.Fragment>
        { this.state.templateData ?  (<React.Fragment><TemplateResponse data="{this.state.templateData}"/> </React.Fragment>) : ''}
      </div>
    );
  }
}
