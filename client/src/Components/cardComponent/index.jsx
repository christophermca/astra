import React from "react";
import "./style.css";

export default class CardComponent extends React.Component {
  render() {
    return (
      <section id="card-container">
        <div className="card-header">flow title area</div>
        <div className="card-button">
          execute<span>...</span>
        </div>
        <div className="card-info">
          <div className="card-value">
            <span className="card-label">Service</span>value
          </div>
          <div className="card-value">
            <span className="card-label">Created Time</span>value
          </div>
          <div className="card-value">
            <span className="card-label">User ID</span>value
          </div>
          <div className="card-value">
            <span className="card-label">Team Name</span>value
          </div>
        </div>
        <div>details</div>
      </section>
    );
  }
}
