import React from "react";
import Modal from "react-modal";
import ReactDropzone from "react-dropzone";
import request from "superagent";

import Inline from "./inline.jsx";

export default class TemplateDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  handleFiles = async e => {
    const file = e.target.files;

    var reader = new FileReader();
    let binaryFile;
    reader.onload = async function(e) {
      var contents = e.target.result;
      binaryFile = window.btoa(unescape(encodeURIComponent(contents)));

      var fileObj = {
        fileContents: binaryFile,
        name: file[0].name,
        extension: file[0].type
      };
      console.log(fileObj);

      const fileUpload = await fetch("http://localhost:3002/api/files/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fileObj),
    });
    };

    reader.readAsText(file[0]);
  };

  saveModal = async e =>{

  }

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    console.log(this.props.files)
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
            <form action="/" method="post" encType="multipart/form-data">
              <input
                id="input-file"
                type="file"
                accept=".csv,.xls "
                multiple
                onChange={this.handleFiles}
              />
            </form>
            <button onClick={this.closeModal}>close</button>
            <button onClick={this.saveModal}>save</button>
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
