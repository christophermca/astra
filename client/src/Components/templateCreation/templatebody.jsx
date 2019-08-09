import React from "react";
import Modal from "react-modal";
import ReactDropzone from "react-dropzone";
import request from "superagent";
import "./style.css";

export default class TemplateBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyVisibility: true,
      line: "body",
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onDrop = files => {
    console.log(files[0].name);
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: files
    });
  };

  handleBody = () => {
    console.log("body clicked");
    this.setState({ bodyVisibility: true });
  };

  handleData = () => {
    console.log("data click");
    this.setState({ bodyVisibility: false });
  };

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    return (
      <section className="template-builderBody">
        <div className="template-header">
          <label>Header</label>
          <textarea />
        </div>

        <div className="template-body">
          <label onClick={this.handleBody}>Body RAW</label>
          <label onClick={this.handleData}>Form Data</label>
          {this.state.bodyVisibility && (
            <div>
              <textarea placeholder="BodyRAW" />
            </div>
          )}

          {!this.state.bodyVisibility && (
            <div>
              <button className="uploadButton" onClick={this.openModal}>
                {" "}
                upload
              </button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
              >
                <div>Upload</div>
                <ReactDropzone onDrop={this.onDrop}>
                  {({ getRootProps }) => (
                    <div className="uploadDropzone" {...getRootProps()}>
                      Upload File
                    </div>
                  )}
                </ReactDropzone>
                <button onClick={this.closeModal}>close</button>
              </Modal>
              <table>
                <tbody>
                  <tr>
                    <td />
                    <td>key</td>
                    <td>value</td>
                    <td>description</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <input placeholder="key" />
                    </td>
                    <td>
                      <input placeholder="value" />
                    </td>
                    <td>
                      <input placeholder="description" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    );
  }
}
