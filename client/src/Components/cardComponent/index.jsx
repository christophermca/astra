import React from "react";
import "./style.css";

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
  }

  handleClick = () => {
    console.log("clicked");
  }

  handleDetail = () => {
    //TODO pass templateID
    const templateId = this.state.data.templateId


    /*
     * TODO remove logic around templateID,
     * This was only needed for initial demo, current data is not normalized
     *
     * templateID ['e2fe334ccd', '2', '3']
     * templateID [1, 2, 3]
     **/
    fetch(`/api/templates/templatedetails?id=${(templateId.length > 3) ? 1 : templateId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      if (!data) return
      const event = new Event('displayTemplateDetails', data);
      window.dispatchEvent(event);
    });
  }

  render() {
    console.log(this.state.data)
    return (
      <section key={this.state.data.templateName} className="card-container">
        <div className="card-header">{this.state.data.templateName}</div>
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
        <div onClick={this.handleDetail} className="card-detail">details</div>
      </section>
    );
  }
}
