import React from "react";
import "./App.css";
import { createStore } from "redux";
import { Provider } from 'react-redux';
import rootReducers from "./reducers/index";
import { CardComponent, Leftnav, TemplateCreation } from "./Components";

const store = createStore(rootReducers);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "Template List" };
  }

  componentDidMount() {
    fetch("/api/templates/templateList", {
      headers: { accepts: "application/json" }
    })
      .then(response => response.json())
      .then(json => this.setState({ list: json }));
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Leftnav />
          <div id="content-container">
            <header>
              <h2>{this.state.title}</h2>
            </header>
            {/* TODO loop through exported components and add them to the page */}
            {/* Place Components below*/}
            <React.Fragment>
              <section className="component" name="cardComponent">
                {this.state.list
                  ? this.state.list.map(item => {
                      return (
                        <CardComponent key={item.templateId} data={item} />
                      );
                    })
                  : ""}
              </section>
            </React.Fragment>
          </div>
        </div>
      </Provider>
    );
  }
}
