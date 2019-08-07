import React from 'react';
import './App.css';
import {TemplateCreation, Leftnav, ListView} from './Components'
import { Route, BrowserRouter as Router } from "react-router-dom";


// NOTE: temp homepage, should we display a log in message ?
function Home(props) {
  return (
    <React.Fragment>
      <h2> It&apos;s Astra </h2>
      <p> '*no login required*'</p>
    </React.Fragment>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props)
  }

  render () {
    return (
    <div className="App">
      <Router>
        <Leftnav />
        <div id="content-container">
          <header>
            <h2> {this.state.title} </h2>
          </header>

          <section className="component">
              <Route exact path="/" component={Home} />
              <Route path="/templates" component={ListView} title="Templates"/>
              <Route path="/templates/create" component={TemplateCreation} />
          </section>
        </div>
      </Router>
    </div>
    );
  }
}
