import React from 'react';
import './styles.scss';
import ReactDropzone from "react-dropzone";
import Modal from "react-modal";
import {Inline, FileList} from './Components';
import {TemplateContext} from '../../../Contexts';

export default class DataFilesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      datasets: [],
      modalIsOpen: false
    })

    this.uploadDataFiles = this.uploadDataFiles.bind(this);
  }

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  uploadDataFiles(files) {
    const formData = new FormData()
    // TODO update template id
    formData.append('templateId', this.props.templateId)
    files.forEach(file => formData.append('files', file))

    const options = {
      method: "POST",
      body: formData
    }

    fetch('/api/files/upload', options).then(response => response.json())
      .then(json => this.setState(prevState => {datasets: prevState.datasets.push(json)}))
      .catch(err => console.error({ err }));
  }

  render() {
    return (
      <div className="data-files-component">
        <header>
          <Inline contextVariables={this.props.contextVariables} inlineDatasets={this.props.inlineDataSets}/>
          <a className="upload" onClick={this.openModal}>
              Upload File <img src="#" width="30" height="30" />
          </a>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="inline"
            ariaHideApp={false}
          >
            <h5>Upload File</h5>
            <ReactDropzone onDrop={this.uploadDataFiles}>
                {({ getInputProps, getRootProps }) => (
              <section>
                <div className="uploadDropzone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
                )}
            </ReactDropzone>
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </header>
        <main>
          {this.props.inlineDatasets && !!this.props.inlineDatasets.length && <FileList filePath="Inline Data" /> }
          {this.state.datasets && this.state.datasets.map(data => <FileList {...data} />)}
          </main>
        </div>
          )
  }
}

