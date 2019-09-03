import React from "react";
import "./style.css";
import { Link } from "react-router-dom";


const CardComponent = props => {
  // console.log(props)
    let templateDetail = `/templates/details/${props.data.templateId}`
    return (
      <section key={props.data.templateId} id={props.data.templateId} className="card-container">
        <Link to={templateDetail} className="card-header">{props.data.templateName}</Link>
        <div onClick={props.handleClick} id={props.data.templateId} className="card-button">
          Execute
        </div>

        <div className="card-main">
          <div className="card-checkbox">
            <input onClick={() => props.handleCheckbox(props.data.templateId)} type="checkBox" />
          </div>
          <div className="card-info">
            <div className="card-value">
              <span className="card-label">Service</span> {props.data.serviceId}
            </div>
            <div className="card-value">
              <span className="card-label">Created Time</span> {props.data.createAt}
            </div>
            <div className="card-value">
              <span className="card-label">User ID</span> {props.data.userId}
            </div>
            <div className="card-value">
              <span className="card-label">Team Name</span>{props.data.teamName}
            </div>
          </div>
        </div>
      </section>
    );
}

export default CardComponent;