import React from "react";
import TemplateHeader from "./templateHeader.jsx";
import TemplateDownload from "./templateDownload.jsx";
import "./style.css";
import * as stubData from "./stubData.json";
import StatefullAccordian from "../shared/statefullaccordian";

export default class TemplateResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, stubData);
  }

  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <form id="template-header">
        {/*
        <section>
          <Dropdown name="method" data={stubData.method}/>
          <input placeholder="url" className="template-url" />
        </section>
      */}
        <section className="response-body">
          {/* <TemplateHeader name="Request Header" data={JSON.stringify(data.requestHeaders, null, 2)}/>
          <TemplateHeader name="Request Body" data={data.requestBody}/>
          <TemplateHeader name="Response Body" data={data.responseBody}/>
          <TemplateDownload name="Data Files" files={data.datasets}/> */}

          <StatefullAccordian
            name="Request Header"
            content={
              <div className="responseContent">
                {JSON.stringify(data.requestHeaders, null, 1)}
              </div>
            }
          />
          <StatefullAccordian
            name="Request Body"
            content={<div className="responseContent">{data.requestBody}</div>}
          />
          <StatefullAccordian
            name="Response Body"
            content={<div className="responseContent">{data.responseBody}</div>}
          />
          <StatefullAccordian
            name="Input File"
            content={
              <div className="responseNestedContent">
                <StatefullAccordian
                  name="input File"
                  content="input file here"
                />{" "}
                <StatefullAccordian
                  name="input File"
                  content="input file here"
                />{" "}
                <StatefullAccordian
                  name="input File"
                  content="input file here"
                />
              </div>
            }
          />
        </section>
      </form>
    );
  }
}
