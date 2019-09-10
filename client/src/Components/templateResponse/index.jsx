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
import QueryBuilder from "../shared/assertions/assertion";

import "./ContextVariables/style.css";

let contextArray = [];
export default class TemplateResponse extends React.Component {
  constructor(props) {
    super(props);

    /*
     *TODO: The Template Data returned from the getTemplateData endpoint returns malformed data
     * The `createAt` and `modifiedAt` keys in a non ISO format which the
     * next subsequent request requires. The React App should only be
     * responsible for reading those keys and should not be required to reformat the data.
     **/

    if(props.data.hasOwnProperty('createAt') && props.data.hasOwnProperty('modifiedAt')) {
      delete props.data.createAt
      delete props.data.modifiedAt
    }

    this.uploadInlineData = this.uploadInlineData.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.submitTemplateToSave = this.submitTemplateToSave.bind(this);
    this.executeSingleTemplate = this.executeSingleTemplate.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = Object.assign(
      { uploadInlineData: this.uploadInlineData },
      { data: props.data },
      { currentSelection: "" },
      { contextName: "" },
      { contextVariables: [] },
      { startRange: "" },
      { endRange: "" },
      { modalIsOpen: false },
      {assertionsClicked: ""}
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
    let result = [];

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
    e.preventDefault();
    let text = "";
    let startRange, endRange;
    if (window.getSelection) {
      text = window.getSelection().toString();
      startRange = window.getSelection().anchorOffset;
      endRange = window.getSelection().extentOffset;
    }

    this.setState({
      currentSelection: text,
      startRange: startRange,
      endRange: endRange
    });

    return text;
  };

  handleContextVariables = e => {
    let contextName = e.target.value;

    this.setState({
      contextName: contextName
    });
  };

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

    this.setState({ assertionsClicked: clicked });

  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    let context = {
      name: this.state.contextName,
      value: this.state.currentSelection
    };

    contextArray.push(context);

    this.setState({
      contextVariables: contextArray
    });

    this.setState(prevState =>
      Object.assign(prevState.data, { contextVariables: contextArray })
    );

    this.setState({ modalIsOpen: false });
  }

  onDelete(e, name) {
    e.preventDefault();

    contextArray = contextArray.filter(el => {
      return el.name !== name;
    });

    this.setState({ contextVariables: contextArray });

    this.setState(prevState =>
      Object.assign(prevState.data, { contextVariables: contextArray })
    );
  }

  handleSave(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("template", JSON.stringify(this.state.data));
    const options = {
      method: "PUT",
      body: formData
    };

    fetch("/api/templates/save", options)
      .then(window.location.href = "http://localhost:3000/templates/")
      .catch(err => console.error({ err }));
  }

  executeSingleTemplate(evt) {
    evt.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([this.state.data.templateId])
    };

    fetch("/api/templates/execute", options)
      .then(response => response.json())
      .then(json => json)
      .catch(err => console.error({ err }));
  }

  submitTemplateToSave(evt) {
    evt.preventDefault();
    console.log("creating template");
    const formData = new FormData();

    formData.append("template", JSON.stringify(this.state.data));
    const options = {
      method: "PUT",
      body: formData
    };

    fetch("/api/templates/save", options)
      .then(response => response.json())
      .then(json => json)
      .catch(err => console.error({ err }));
  }

  render() {
    const { data } = this.props;
    return (
      <TemplateContext.Provider value={this.state}>
        <form id="template-response" onSubmit={this.handleSave}>
          <ContextMenuTrigger id="contextMenu">
            <EndpointRequestHeader
              onContextMenu={this.onContextClick}
              method={data.requestType}
              url={data.httpUrlPathParams}
            />
          </ContextMenuTrigger>
          <main>
            <section className="response-body">
              <StatefullAccordian name="Request Header">
                <ContextMenuTrigger id="contextMenu">
                  <div
                    onContextMenu={this.onContextClick}
                    className="responseContent"
                  >
                    <pre>{data.requestBody}</pre>
                  </div>
                </ContextMenuTrigger>
              </StatefullAccordian>
              <StatefullAccordian name="Request Body">
                <ContextMenuTrigger id="contextMenu">
                  <div
                    onContextMenu={this.onContextClick}
                    className="responseContent"
                  >
                    <pre>{data.requestBody}</pre>
                  </div>
                </ContextMenuTrigger>
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
                <div className="context">
                  {this.state.contextVariables.map(i => {
                    return (
                      <div className="contextWrapper">
                        <h1 className="contextName">
                          {" "}
                          <span ref="nameRef">{i.name}</span>: {i.value}{" "}
                        </h1>
                        <button
                          className="contextDelete"
                          onClick={evt => this.onDelete(evt, i.name)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
              </StatefullAccordian>
              <StatefullAccordian name="Data Files">
                <DataFiles
                  contextVariables={this.state.contextVariables}
                  inlineDatasets={this.state.inlineDatasets}
                  datasets={this.state.datasets}
                />
              </StatefullAccordian>
              <StatefullAccordian name="Assertions">
                <AssertionData clicked = {this.state.assertionsClicked}/>
              </StatefullAccordian>
            </section>
          </main>
          <button type="submit">Save</button>
          <button onClick={this.executeSingleTemplate}> Save & Execute</button>
        </form>

        <ContextMenu id="contextMenu">
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
            <input
              type="text"
              name="name"
              onChange={this.handleContextVariables}
            />
          </label>
          <div>
            {" "}
            <span>Value: </span>
            {this.state.currentSelection}
          </div>
          <button onClick={this.closeModal}>Save</button>
          <button onClick={() => this.setState({ modalIsOpen: false })}>
            Close
          </button>
        </Modal>
      </TemplateContext.Provider>
    );
  }
}
