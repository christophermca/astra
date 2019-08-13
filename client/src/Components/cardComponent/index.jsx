import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    console.log("clicked");
  }

  render() {
    let templateDetail = `/templates/details/${this.state.data.templateId}`
    return (
      <section key={this.state.data.templateName} className="card-container">
        <Link to={templateDetail} className="card-header">{this.state.data.templateName}</Link>
        <div className="card-button">
          execute<span>...</span>
        </div>

        <div className="card-main">
          <div className="card-checkbox">
            <input onClick={this.handleClick} type="checkBox" />
          </div>
          <div className="card-info">
            <div className="card-value">
              <span className="card-label">Service</span> {this.state.data.serviceId}
            </div>
            <div className="card-value">
              <span className="card-label">Created Time</span> {this.state.data.createdAt}
            </div>
            <div className="card-value">
              <span className="card-label">User ID</span> {this.state.data.userId}
            </div>
            <div className="card-value">
              <span className="card-label">Team Name</span>{this.state.data.teamName}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
