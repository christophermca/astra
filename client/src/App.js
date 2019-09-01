import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {Leftnav} from './Components';
import { HomeView, TemplateListView, CreateView, DetailsView } from './Views/index';


// NOTE: temp homepage, should we display a log in message ?

 const App = () => {
    return (
    <div className="App">
      <Router>
        <Leftnav />
        <div id="content-container">
          <header>
            <h2>Templates</h2>
          </header>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/templates" component={TemplateListView} title="Templates List"/>
          <Route exact path="/templates/create" component={CreateView} title="Templates Create"/>
          <Route exact path="/templates/details/:id" component={DetailsView} title="Templates Create"/>
        </div>
      </Router>
    </div>
    );
}

export default App;