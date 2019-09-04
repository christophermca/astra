import React from "react";
import "./style.scss";
import StatefullAccordian from "../shared/statefullaccordian";
import StatelessAccordian from "../shared/statelessaccordian";
import { EndpointRequestHeader } from "../shared/index";
import DataFiles from "./DataFiles";
import { TemplateContext } from '../../Contexts/index';

export default class TemplateResponse extends React.Component {

  constructor(props) {
    super(props);
    this.uploadInlineData = this.uploadInlineData.bind(this);

    this.state = Object.assign({uploadInlineData: this.uploadInlineData}, {data: props.data})
  }

  uploadInlineData(inlineData) {
    const temp = []
    for(let item of inlineData.entries()) {
      temp.push(item)
    }
    this.setState((prevState) => prevState['data']['inlineDatasets'] = temp)
  }

  render() {
    const { data } = this.props;
    return (
      <TemplateContext.Provider value={this.state}>
        <form id="template-response">
          <EndpointRequestHeader method={data.requestType} url={data.httpUrlPathParams} />
          <main>
            <section className="response-body">
              <StatefullAccordian name="Request Header">
                <div className="responseContent">{data.requestBody}</div>
              </StatefullAccordian>
              <StatefullAccordian name="Request Body">
                <div className="responseContent">{data.requestBody}</div>
              </StatefullAccordian>
              <StatefullAccordian name="Response Body" >
                <div className="responseContent">{JSON.stringify(data.responseBody, null, 2)}</div>
              </StatefullAccordian>
                {/* example of nested accordions */}
              <StatefullAccordian name="Input File">
                <div className="responseNestedContent">
                  <StatefullAccordian name="input File">
                      input file here
                  </StatefullAccordian>
                </div>
              </StatefullAccordian>
            </section>
            <section className="assertions">
              <StatefullAccordian name="Data Files">
                <DataFiles contextVariables={data.contextVariables} inlineDatasets={data.inlineDatasets} datasets={data.datasets} />
              </StatefullAccordian>
            </section>
          </main>
        </form>
      </TemplateContext.Provider>
      )
    }
  }
