import React from "react";
import "./style.css";
import StatefullAccordian from "../shared/statefullaccordian";
import AssertionData from "../shared/assertions/assertionData";

export default class TemplateResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assertionsResponseObject: "" };
  }
  componentDidMount() {
    const obj = this.props.data.responseBody;

    let objPath = this.nestedObjectToArray(obj);

    let assertionObj = objPath.map(i =>{
      let iKey = i.substring(i.lastIndexOf('.') + 1);
      let path = i;

      let obj = {[iKey]: path}
      return obj
    })

    this.setState({ assertionsResponseObject: assertionObj }, () => console.log(this.state));
  }

  onClick = () =>{
    const obj = this.props.data.responseBody;
    Object.entries(obj).map(i =>{
      return i
   })
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

  onResponseItemClick = (e) => {
    console.log('clicked')
    console.log(e.target);
  };
  render() {
    const data = this.props.data;
    return (
      <form id="template-response">
        <section id="template-header">
          <input name="method" value={data.requestType} />
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
              content={
                <div className="responseContent">{data.requestBody}</div>
              }
            />
            <StatefullAccordian
              name="Response Body"
              onClick={this.onResponseItemClick}
              content={
                <div className="responseContent">
                  {JSON.stringify(data.responseBody, null, 1)}
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
