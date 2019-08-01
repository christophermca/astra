import React from 'react';
import './App.css';

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
        {/* build react component here <create> */}
      </div>
    );
  }
}
