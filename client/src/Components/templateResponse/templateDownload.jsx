import React from "react";
import Modal from "react-modal";
import ReactDropzone from "react-dropzone";
import request from "superagent";

import Inline from './inline.jsx'

export default class TemplateDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    console.log(props);
  }

  onDrop = files => {
    console.log(files[0].name);
    const req = request.post("https://httpbin.org/post");

    files.forEach(file => {
      req.attach(file.name, file);
    });

    req.end();
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
      <div id="template-response">
        <label className="header-title">{this.props.name}</label>
        <div className="header-info">
        
        <Inline />

          <a className="upload" onClick={this.openModal}>
            Upload File
          </a>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="inline"
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

          <div className="fileList">
            {/* insert map for list of files */}
            <div>{this.props.files.filePath}</div>
            <a href={this.props.files.filePath} download>
              Download
            </a>
          </div>
        </div>
      </div>
    );
  }
}
