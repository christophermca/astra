import React from "react";
import "./style.css";
const StatelessAccordian = props => {

  const accordianState = props => {
    if (props.toggleState) {
      return <div className="accordianState">+</div>;
    } else {
      return (
        <>
          <div className="accordianState">-</div>
        </>
      );
    }
  };
  return (
    <div className={props.classState}>
      <div className="accordianHeader"> {props.name}</div>
      <div className="accordianToggle">{accordianState(props)}</div>
    </div>
  );
};
export default StatelessAccordian;
