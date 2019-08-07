import React from "react";
import "./style.css";

export default class TemplateBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyVisibility: true,
      line: "body"
    };
  }

  handleBody = () => {
    console.log("body clicked");
    this.setState({ bodyVisibility: true });
  };

  handleData = () => {
    console.log("data click");
    this.setState({ bodyVisibility: false });
  };
  render() {
    return (
      <section className="template-builderBody">
        <div className="template-header">
          <label>Header</label>
          <textarea />
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
              <table>
                <tr>
                    <td></td>
                  <td>key</td>
                  <td>value</td>
                  <td>description</td>
                </tr>
                <tr>
                    <td><input type="checkbox"></input></td>
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
              </table>
            </div>
          )}
        </div>
      </section>
    );
  }
}
