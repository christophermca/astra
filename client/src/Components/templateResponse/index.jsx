import React from "react";
import "./style.css";
import StatefullAccordian from "../shared/statefullaccordian";
import AssertionData from "../shared/assertions/assertionData";

export default class TemplateResponse extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <form id="template-response">
        <section id="template-header">
          <input name="method" value={data.requestType}/>
          <input value={data.httpUrlPathParams} className="template-url" />
        </section>
        <main id="responseSection">
          <section className="response-body">

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
              content={<div className="responseContent">{JSON.stringify(data.responseBody, null, 2)}</div>}
            />
            <StatefullAccordian
              name="Input File"
              content={
                <div className="responseNestedContent">
                {data.files}
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
          <section className="assertions">
          <StatefullAccordian
                    name="Assertions"
                    content={<AssertionData data={data.requestBody} />}
                  />
          </section>
        </main>
      </form>
    );
  }
}
