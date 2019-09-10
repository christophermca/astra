import React from "react";
import QueryBuilder from "./assertion";

import "./style.scss";
import "../style.css";

let queryBuilder = null;
export default class AssertionData extends React.Component {
  componentDidMount() {
    const _el = document.getElementById("query-builder");
    queryBuilder = new QueryBuilder(_el); 
  }

  componentDidUpdate(){
    let _selects = queryBuilder.rulesContainer.querySelectorAll(
      ".assertion-field")

      if(this.props.clicked !== undefined ){
        if (!queryBuilder.fields.includes(this.props.clicked)) {
          queryBuilder.fields.push(this.props.clicked);
  
          _selects.forEach((select, index) => {
            select.appendChild(
              queryBuilder.makeElement(`<option value="${this.props.clicked}">${this.props.clicked}</option>`)
            );
          });
        }
  
        if (_selects.length) _selects[_selects.length - 1].value = this.props.clicked;
      }
  }

  render() {
    return <div id="query-builder"></div>;
  }
}
