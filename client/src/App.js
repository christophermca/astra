import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {Leftnav} from './Components';
import { HomeView, ListView, CreateView, DetailsView } from './Views/index';


// NOTE: temp homepage, should we display a log in message ?

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Title"
    }
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
          <Route exact path="/" component={HomeView} />
          <Route exact path="/templates" component={ListView} title="Templates List"/>
          <Route exact path="/templates/create" component={CreateView} title="Templates Create"/>
          <Route exact path="/templates/details/:id" component={DetailsView} title="Templates Create"/>
        </div>
      </Router>
    </div>
    );
  }
}
