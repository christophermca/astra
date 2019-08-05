import React from 'react';
import './App.css';
import {TemplateCreation, CardComponent} from './Components'

// holding for reference - delete before merging
// function displayComponent(props) {
//   return (
//     <section className="component"> <h3>{props.name}</h3> </section>
//   )
// }

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '<human>'};
  }

  componentDidMount() {
    fetch('/test', {accept: 'application/json'})
      .then(res => res.json())
      .then(response => {
        this.setState(response)
    })
    .catch(err => console.log(err))
  }

  render () {

    return (
      <div className="App">
        <h2>
          ASTRA Component Library
        </h2>
        {/* TODO loop through exported components and add them to the page */}
        {/* Place Components below*/}
        <React.Fragment>
          <section className="component" name="templateCreation">
            <TemplateCreation />
          </section>
          <section className="component" name="cardComponent">
          <CardComponent />
        </section>
        </React.Fragment>
      </div>
    );
  }
}
