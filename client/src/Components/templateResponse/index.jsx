import React from "react";
import TemplateHeader from './templateHeader.jsx';
import Dropdown from '../templateCreation/dropdown.jsx';
import TemplateDownload from './templateDownload.jsx';
import "./style.css";
import * as stubData from "./stubData.json";

export default class TemplateResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, stubData);
    console.log(stubData)
  }

  render() {
    return (
      <form id="template-header">
        <section>
          <Dropdown name="method" data={stubData.method}/>
          <input placeholder="url" className="template-url" />
        </section>
        <section className="response-body">
          <TemplateHeader name="Request Header" data={stubData.requestHeader}/>
          <TemplateHeader name="Request Body" data={stubData.requestBody}/>
          <TemplateHeader name="Response Body" data={stubData.responseBody}/>
          <TemplateDownload name="Data Files" files={stubData.datasets}/>
        </section>
      </form>
    );
  }
}
