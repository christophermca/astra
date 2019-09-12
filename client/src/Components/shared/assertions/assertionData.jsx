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
    if(this.props.clicked !== undefined )
      queryBuilder.injectFieldData(this.props.clicked);
  }

  render() {
    return <div id="query-builder"></div>;
  }
}
