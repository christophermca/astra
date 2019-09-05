import React from "react";
import Modal from "react-modal";
import {TemplateContext} from '../../../../Contexts';

export default class Inline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal = (cb, evt) => {
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
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="inline"
            ariaHideApp={false}
          >
            <h5> Add Inline Data </h5>
              {this.props.contextVariables && (
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
                        {this.props.contextVariables.map(item =>
                      <td>
                        <input name={item.name} defaultValue={item.value} />
                      </td>
                        )}
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
