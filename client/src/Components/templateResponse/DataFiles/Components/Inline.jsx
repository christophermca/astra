import React from "react";
import Modal from "react-modal";
import {TemplateContext} from '../../../../Contexts';

export default class Inline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contextVariables: props.contextVariables,
      modalIsOpen: false
    };
  }

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  handleInputChange = (evt) => {
    this.setState({value: evt.target.value}, console.log({cb: evt.target.value}));
  }

  closeModal = (cb, evt) => {
    // TODO fix arguments when calling closeModal from onRequestClose
    evt.preventDefault()

    const form = evt.target;
    const formData = new FormData(form);

    this.setState({ modalIsOpen: false }, cb(formData));
  };

  render() {
    return (
      <TemplateContext.Consumer>
          { ({uploadInlineData}) => {
          return (
        <div>
          <a className="inline" onClick={this.openModal}>
              Add/View inline View
          </a>
          <Modal isOpen={this.state.modalIsOpen} contentLabel="inline" ariaHideApp={false} >
            <h5> Add Inline Data </h5>
              {this.state.contextVariables && (
            <form className="inline-data" onSubmit={this.closeModal.bind(this, uploadInlineData)}>
              <table>
                <thead>
                  <tr>
                    <React.Fragment>
                        {this.props.contextVariables.map(item =>
                      <td>
                          {item.name}
                      </td>
                        )}
                    </React.Fragment>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <React.Fragment>
                      {this.state.contextVariables.map(item => {
                      console.log(item);
                      return (
                      <td>
                        <input name={item.name} defaultValue={item.value} value={this.state.value} onChange={this.handleInputChange}/>
                      </td>
                      )})}
                    </React.Fragment>
                  </tr>
                </tbody>
              </table>
              <button type="submit">close</button>
            </form>
              )
              }
          </Modal>
        </div>
          )}
          }
      </TemplateContext.Consumer>
        );
  }
}
