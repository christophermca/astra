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
    this.handleBody = this.handleBody.bind(this);
    this.handleData   = this.handleData.bind(this);
    this.saveModal = this.saveModal.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
  }

  handleBody() {
    this.setState({ bodyVisibility: true });
  };

  handleData() {
    this.setState({ bodyVisibility: false });
  };

  openModal(e) {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal() {
    this.setState({ modalIsOpen: false });
  };

  async saveModal(e) {
    window.dispatchEvent('fileUpload', this.state.fileObject);
  }

  async handleFiles(e) {
    const files = e.target.files;
    this.setState({ fileObject: files})
  };


  render() {
    return (
      <section className="template-builderBody">
        <div className="template-header">
          <label>Header</label>
          <textarea value={JSON.stringify(this.props.header)} />
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
                <input
                  name="files"
                  id="input-file"
                  type="file"
                  accept=".csv,.xls "
                  multiple
                  onChange={this.handleFiles}
                />
                <button onClick={this.closeModal}>close</button>
                <button disabled={!this.state.fileObject} onClick={this.saveModal}>save</button>
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
