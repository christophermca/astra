import React from "react";
import Modal from "react-modal";

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

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
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
          {this.props.contextVariables &&
          (<table className="inline-data">
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
                    {item.value}
                  </td>
                  )}
                </React.Fragment>
              </tr>
            </tbody>
          </table>)
          }


          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
      );
  }
}
