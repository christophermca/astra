import React from "react";
import Modal from "react-modal";
import {TemplateContext} from '../../../../Contexts';

const rows = () => <tr><td> <input/> </td></tr>

export default class Inline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contextVariables: props.contextVariables,
      modalIsOpen: false,
      rows: 1
    };
    this.addRow = this.addRow.bind(this);
  }

  createTable = () => {
    let tbody = []
    for(let i=0 i <= this.state.contextVariables.length; i++) {
      for(let j=0; j <= this.state.rows; j++) {
        tbody.push(<tr><td><input/></td></tr>)
      }
      return tbody;
    }
  }

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  handleInputChange = (evt) => {
    this.setState({value: evt.target.value}, console.log({cb: evt.target.value}));
  }

  closeModal = (evt, cb) => {
    evt.preventDefault()

    const form = evt.target;
    const formData = new FormData(form);

    this.setState({ modalIsOpen: false }, cb(formData));
  };

  addRow() {
    this.setState(prevState => {rows: prevState.rows++}, console.log({row: this.state.rows}))


  }
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
            <header>
              <button onClick={this.addRow}>add</button>
              <h5> Add Inline Data </h5>
            </header>
              {this.state.contextVariables && (
              <form className="inline-data" onSubmit={(evt) => this.closeModal(evt, uploadInlineData)}>
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
                  {this.createTable()}
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
