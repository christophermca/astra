import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {Leftnav, TemplateResponse, TemplateCreation} from './Components';
import { ListView, CreateView } from './Views/index';


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
              <Route exact path="/templates" component={ListView} title="Templates List"/>
              <Route exact path="/templates/create" component={CreateView} title="Templates Create"/>
          </section>
        </div>
      </Router>
    </div>
    );
  }
}
