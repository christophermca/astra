import React from "react";
import TemplateHeader from './templateHeader.jsx';
import DisplayURLMethod from '../DisplayURLMethod.jsx';
import TemplateDownload from './templateDownload.jsx';
import "./style.css";
import * as stubData from "./stubData.json";

export default class TemplateResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, stubData);
  }

  render() {
    const data = this.props.data;
    console.log(data)
    return (
      <form id="template-header">
       <DisplayURLMethod method={this.state.config.method} url={this.state.config.url}/>
        <section className="response-data">
          <TemplateHeader name="Request Header" data={JSON.stringify(data.requestHeaders, null, 2)}/>
          <TemplateHeader name="Request Body" data={data.requestBody}/>
          <TemplateHeader name="Response Body" data={data.responseBody}/>
          <TemplateDownload name="Data Files" files={data.datasets}/>
        </section>
        <section className="assertion-builder">
        </section>
      </form>
    );
  }
}
