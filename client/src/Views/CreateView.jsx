import React from "react";
import { TemplateResponse, TemplateCreation } from "../Components";
import "./styles/createView.css";
import { ViewContext } from "../Contexts";

function handleSubmit(evt) {
  evt.preventDefault();
  console.log("creating template");
  const form = evt.target;
  const formData = new FormData(form);

  formData.append("active", true);
  formData.append(
    "template",
    JSON.stringify({
      templateName: formData.get("templateName"),
      httpUrlPathParams: formData.get("httpUrlPathParams"),
      requestType: formData.get("requestType")
    })
  );
  console.log(formData.get('template'))
  const options = {
    method: "POST",
    body: formData
  };

  return fetch("/api/templates/create", options)
    .then(response => response.json())
    .then(json => this.setState({ templateData: json.template }))
    .catch(err => console.error({ err }));
}
function handleSave(evt) {
  evt.preventDefault();
  const formData = new FormData()
  formData.append('template', JSON.stringify(this.state.templateData))
  console.log(formData.get('template'));
  console.log('saving template')
  const options = {
    method: "PUT",
    body: formData
  }

  return fetch('/api/templates/save', options).then(response => response.json())
    .then(json => console.log(`The Template Object: ${json}`))
    .catch(err => console.error({ err }));
}



export default class CreateView extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = handleSubmit.bind(this);
    this.handleSave = handleSave.bind(this);
    this.state = {createTempl: this.handleSubmit, saveTempl: this.handleSave}
    }

  render() {
    return (
      <section className="component" name="cardComponent">
        <ViewContext.Provider value={this.state}>
          <TemplateCreation />
          {this.state.templateData && (
            <TemplateResponse data={this.state.templateData} />
          )}
        </ViewContext.Provider>
      </section>
    );
  }
}
