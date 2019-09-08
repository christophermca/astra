import React from "react";
import "./style.scss";
import StatefullAccordian from "../shared/statefullaccordian";
import AssertionData from "../shared/assertions/assertionData";
import { EndpointRequestHeader } from "../shared/index";
import DataFiles from "./DataFiles";
import ContextVariables from "./ContextVariables/contextVariables";
import { TemplateContext } from "../../Contexts/index";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Modal from "react-modal";

import './ContextVariables/style.css'

let contextArray = [];
export default class TemplateResponse extends React.Component {
  constructor(props) {
    super(props);
    this.uploadInlineData = this.uploadInlineData.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = Object.assign(
      { uploadInlineData: this.uploadInlineData },
      { data: props.data },
      { currentSelection: "" },
      { contextName: ""},
      { contextVariables: [] },
      { modalIsOpen: false }
    );
  }

  uploadInlineData(inlineData) {
    const temp = [];
    for (let item of inlineData.entries()) {
      temp.push(item);
    }
    this.setState(prevState => (prevState["data"]["inlineDatasets"] = temp));
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

    this.setState({ assertionPathResponse: assertionObj });
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

  onContextClick = e => {
    console.log(e.type);

    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    }

    this.setState({ currentSelection: text });

    return text;
  };

  handleContextVariables = (e) =>{
    let contextName = e.target.value;

    this.setState({
      contextName: contextName
    })
   
  }

  onResponseItemClick = e => {
    let s = window.getSelection();
    var range = s.getRangeAt(0);
    var node = s.anchorNode;
    let clickedItems = [];
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
    clickedItems.push(clicked);

    this.setState({ assertionsClicked: clickedItems }, () =>
      console.log(this.state)
    );
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    let context = {
      name: this.state.contextName,
      value: this.state.currentSelection
    }

    contextArray.push(context);

    this.setState({
      contextVariables: contextArray
    })

    
    console.log(this.state.data)
    this.setState({ modalIsOpen: false });
  }


  render() {
    const { data } = this.props;
    return (
      <TemplateContext.Provider value={this.state}>
        <form id="template-response">
          <EndpointRequestHeader
            method={data.requestType}
            url={data.httpUrlPathParams}
          />
          <main>
            <section className="response-body">
              <StatefullAccordian name="Request Header">
                <ContextMenuTrigger id="some_unique_identifier">
                  <div
                    onContextMenu={this.onContextClick}
                    className="responseContent"
                  >
                   <pre>{data.requestBody}</pre>
                  </div>
                </ContextMenuTrigger>
              </StatefullAccordian>
              <StatefullAccordian name="Request Body">
                <div className="responseContent"><pre>{data.requestBody}</pre></div>
              </StatefullAccordian>
              <StatefullAccordian name="Response Body">
                <div
                  onClick={this.onResponseItemClick}
                  className="responseContent"
                >
                  <pre>{JSON.stringify(data.responseBody, null, 2)}</pre>
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
              <StatefullAccordian name="Context Variables">
                <ContextVariables variables={this.state.contextVariables} />
              </StatefullAccordian>
              <StatefullAccordian name="Data Files">
                <DataFiles
                  contextVariables={data.contextVariables}
                  inlineDatasets={data.inlineDatasets}
                  datasets={data.datasets}
                />
              </StatefullAccordian>
              <StatefullAccordian name="Assertions">
                <AssertionData />
              </StatefullAccordian>
            </section>
          </main>
        </form>

        <ContextMenu id="some_unique_identifier">
          <MenuItem
            style={{ backgroundColor: "black" }}
            onClick={this.openModal}
          >
            Add Context Variable
          </MenuItem>
        </ContextMenu>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add Context Variable"
          ariaHideApp={false}
        >
          <h2>Add Context Variable</h2>
          <label>
            Name: 
            <input type="text" name="name" onChange={this.handleContextVariables}/>
          </label>
          <div>
            {" "}
            <span>Value: </span>
            {this.state.currentSelection}
          </div>
          <button onClick={this.closeModal}>Save</button>
          
        </Modal>
      </TemplateContext.Provider>
    );
  }
}
