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

          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}
