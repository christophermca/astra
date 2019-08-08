import React from "react";
import "./style.css";

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.handleClick = this.handleClick.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
  }

  handleClick = () => {
    console.log("clicked");
  }

  handleDetail = () =>{
    //TODO pass templateID
    const templateId = this.props.data.templateId

    fetch('/api/getOneTemplate/')
    .then(data => this.setState({ templateData: data }))

  }

  render() {
    return (
      <section key={this.props.data.templateName} className="card-container">
        <div className="card-header">{this.props.data.templateName}</div>
        <div className="card-button">
          execute<span>...</span>
        </div>

        <div className="card-main">
          <div className="card-checkbox">
            <input onClick={this.handleClick} type="checkBox" />
          </div>
          <div className="card-info">
            <div className="card-value">
              <span className="card-label">Service</span> value
            </div>
            <div className="card-value">
              <span className="card-label">Created Time</span> value
            </div>
            <div className="card-value">
              <span className="card-label">User ID</span> value
            </div>
            <div className="card-value">
              <span className="card-label">Team Name</span>value
            </div>
          </div>
        </div>
        <div onClick={this.handleDetail} className="card-detail">details</div>
      </section>
    );
  }
}
