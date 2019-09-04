import React from "react";
import "./style.scss";
import StatefullAccordian from "../shared/statefullaccordian";
import AssertionData from "../shared/assertions/assertionData";
import StatelessAccordian from "../shared/statelessaccordian";
import { EndpointRequestHeader } from "../shared/index";
import DataFiles from "./DataFiles";
import { ViewContext } from '../../Views/context.js'

export default class TemplateResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertionsResponseObject: "",
      displaySections: [],
      assertionsClicked: ""
    };
  }
  componentDidMount() {
    const obj = this.props.data.responseBody;

    let objPath = this.nestedObjectToArray(obj);

    let assertionObj = objPath.map(i => {
      let iKey = i.substring(i.lastIndexOf(".") + 1);
      let path = i;

      let obj = { [iKey]: path };
      return obj;
    });

    this.setState({ assertionPathResponse: assertionObj }, () =>
      console.log(this.state)
    );
  }

  nestedObjectToArray = obj => {
    if (typeof obj !== "object") {
      return [obj];
    }
    var result = [];
    if (obj.constructor === Array) {
      obj.map(item => {
        result = result.concat(this.nestedObjectToArray(item));
      });
    } else {
      Object.keys(obj).map(key => {
        if (typeof obj[key] === "object") {
          var chunk = this.nestedObjectToArray(obj[key]);
          chunk.map(item => {
            result.push(key + "." + item);
          });
        } else {
          result.push(key);
        }
      });
    }
    return result;
  };

  onResponseItemClick = e => {
    let s = window.getSelection();
    var range = s.getRangeAt(0);
    var node = s.anchorNode;
    while (range.toString().indexOf('"') !== 0) {
      range.setStart(node, range.startOffset - 1);
    }
    range.setStart(node, range.startOffset + 1);
    do {
      range.setEnd(node, range.endOffset + 1);
    } while (
      range.toString().indexOf(" ") === -1 &&
      range.toString().trim() !== "" &&
      range.endOffset < node.length
    );
    var str = range.toString();
    var clicked = str.substr(0, str.indexOf('"'));
    console.log(clicked);
    this.setState({ assertionsClicked: clicked }, () =>
      console.log(this.state)
    );
  };

  render() {
    const { data } = this.props;
    return (
      <ViewContext.Consumer>
        {({ assertionPathResponse }) => {
          return (
            <form id="template-response">
              <EndpointRequestHeader
                method={data.requestType}
                url={data.httpUrlPathParams}
              />
              <main>
                <section className="response-body">
                  <StatefullAccordian name="Request Header">
                    <div className="responseContent">{data.requestBody}</div>
                  </StatefullAccordian>
                  <StatefullAccordian name="Request Body">
                    <div className="responseContent">{data.requestBody}</div>
                  </StatefullAccordian>
                  <StatefullAccordian name="Response Body">
                    <div
                      onClick={this.onResponseItemClick}
                      className="responseContent"
                    >
                      {JSON.stringify(data.responseBody, null, 2)}
                    </div>
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
                    <DataFiles datasets={data.datasets} />
                  </StatefullAccordian>
                  <StatefullAccordian name="Assertions">
                    <AssertionData />
                  </StatefullAccordian>
                </section>
              </main>
            </form>
          );
        }}
      </ViewContext.Consumer>
    );
  }
}
