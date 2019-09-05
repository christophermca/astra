import React from 'react';
import './styles.scss';
import ReactDropzone from "react-dropzone";
import Modal from "react-modal";
import {Inline, FileList} from './Components';
import {TemplateContext} from '../../../Contexts';

//TODO move to a better location.

export default class DataFilesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
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
    formData.append('templateId', 1)
    files.forEach(file => formData.append('files', file))

    const options = {
      method: "POST",
      body: formData
    }

    console.log('Will upload file(s)', [...files]);
    //TODO remove mocked response and actually fetch data
    // fetch('/api/upload/files', options).then(response => response.json())
    //   .then(json => json)
    //   .catch(err => console.error({ err }));


    //mocked response
    const mockedResponse = files.map((file, i) => {
      const fileListLength = this.props.datasets.length;
      return ({id: `${fileListLength + i+1}`, filePath: `/user/temp/${file.name}`})
    })

    this.setState(prevState => prevState.datasets.push(...mockedResponse))
  }

  render() {
    return (
      <div className="data-files-component">
        <header>
          <Inline contextVariables={this.props.contextVariables} inlineDatasets={this.props.inlineDataSets}/>
          <a href="Javascript:viod(0);" className="upload" onClick={this.openModal}>
              Upload File
            <img src="#" width="30" height="30" />
          </a>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="inline"
            ariaHideApp={false}
          >
            <h5>Upload File</h5>
            <ReactDropzone onDrop={this.uploadDataFile}>
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
            {this.props.inlineDatasets && (Object.keys(this.props.inlineDatasets[0]).length > 0) && <FileList filePath="Inline Data" /> }

            {this.props.datasets && this.props.datasets.map(data => {
              return ( <FileList {...data} /> )
            })}
          </main>
        </div>
          )
  }
}

