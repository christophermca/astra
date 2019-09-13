import React from "react";
import "./style.css";
import StatelessAccordian from "./statelessaccordian";

export default class StatefullAccordian extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {
        openAccordian: false,
        accordianClassname: "accordianCloseHeader"
      },
      props
    );
  }

  handleAccordian = () => {
    if (this.state.openAccordian) {
      this.setState({
        openAccordian: false,
        accordianClassname: "accordianCloseHeader"
      });
    } else {
      this.setState({
        openAccordian: true,
        accordianClassname: "accordianOpenHeader"
      });
    }
  };

  render() {
    return (
      <div className="accordianWrapper">
        <div onClick={this.handleAccordian}>
          <StatelessAccordian
            name={this.props.name}
            classState={this.state.accordianClassname}
            toggleState={this.state.openAccordian}
          />
        </div>
        {this.state.openAccordian && (
          <div className="accordianContent">
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
