import React from 'react';
import './styles.scss';
import ReactDropzone from "react-dropzone";
import Modal from "react-modal";
import Inline from '../inline.jsx'

const ListFile = (props) => {
  return (
    <React.Fragment>
      <tbody>
        <tr>
          <td>{props.id}</td>
          <td>{props.filePath}</td>
          <td><img src="#" height="20" width="20" /></td>
        </tr>
      </tbody>
    </React.Fragment>
  )
}
export default class DataFilesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      modalIsOpen: false
    }, props)

    this.uploadDataFile = this.uploadDataFile.bind(this);
  }

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  uploadDataFile(files) {
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
      const fileListLength = this.state.datasets.length;
      return ({id: `${fileListLength + i+1}`, filePath: `/user/temp/${file.name}`})
    })

    this.setState(prevState => prevState.datasets.push(...mockedResponse))
  }

  render() {
    return (
      <div className="data-files-component">
        <header>
          <Inline />
            <a className="upload" onClick={this.openModal}>
              Upload File
              <img src="#" width="40" height="40" />
            </a>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="inline"
              ariaHideApp={false}
            >
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
        <table>
          <thead>
            <tr>
              <td>ID:</td>
              <td>filePath</td>
              <td>Download</td>
            </tr>
          </thead>
            {this.state.datasets && this.state.datasets.map(data => {
              return ( <ListFile {...data} /> )
            })}
        </table>
      </div>
    )
  }
}

