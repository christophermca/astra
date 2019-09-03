import React from "react";
import "./style.css";
import StatefullAccordian from "../shared/statefullaccordian";
import { ViewContext } from "../../Views/context";

export default class TemplateResponse extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <ViewContext.Consumer>
        {({ saveTempl }) => {
          return (
            <form id="template-response" onSubmit={saveTempl}>
              <section id="template-header">
                <input name="method" value={data.requestType} />
                <input
                  value={data.httpUrlPathParams}
                  className="template-url"
                />
              </section>
              <main>
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
                    content={
                      <div className="responseContent">{data.requestBody}</div>
                    }
                  />
                  <StatefullAccordian
                    name="Response Body"
                    content={
                      <div className="responseContent">
                        {JSON.stringify(data.responseBody, null, 2)}
                      </div>
                    }
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
                <section className="assertions"></section>
                <button type="submit">Save</button>
              </main>
            </form>
          );
        }}
      </ViewContext.Consumer>
    );
  }
}
