import React from 'react';
import './App.css';
import {TestComponent, LMC} from './Components'

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
        hello {this.state.name}
        <h2>
          Astra Components
        </h2>
        <LMC />
        {/* build react component here <create> */}
      </div>
    );
  }
}
