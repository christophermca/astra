import React from "react";
import Modal from "react-modal";
import "./style.css";

export default class TemplateBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {
        bodyVisibility: true,
        line: "body",
        modalIsOpen: false,
        fileObject: ""
      },
      props
    );

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

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

  saveModal = async e =>{
    console.log(this.fileObject)
    const fileUpload = await fetch("http://localhost:3002/api/files/upload", {
      method: "POST",
      body: JSON.stringify(this.handleFiles),
    });
  }

  handleFiles = async e => {
    const file = e.target.files;

    var reader = new FileReader();
    let binaryFile;
    reader.onload = async e => {
      var contents = e.target.result;
      binaryFile = window.btoa(unescape(encodeURIComponent(contents)));

      var fileObj = {
        fileContents: binaryFile,
        name: file[0].name,
        extension: file[0].type
      };

      this.setState({ fileObject: fileObj})
    };

    reader.readAsText(file[0]);
  };


  render() {
    return (
      <section className="template-builderBody">
        <div className="template-header">
          <label>Header</label>
          <textarea value={JSON.stringify(this.state.header)} />
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
                enctype="multipart/form-data"
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
