import React from 'react';
import './App.css';
import {CardComponent, Leftnav} from './Components'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: 'Template List'};
  }

  render () {
    return (
    <div className="App">
    <Leftnav />
      <div id="content-container">
        <header>
          <h2>
      {this.state.title}
          </h2>
        </header>
        {/* TODO loop through exported components and add them to the page */}
        {/* Place Components below*/}
        <React.Fragment>
          <section className="component" name="cardComponent">
            <CardComponent />
          </section>
        </React.Fragment>
        </div>
    </div>
    );
  }
}
