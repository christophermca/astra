import React from "react";
import { fromJS } from "immutable";
import { Query, Builder, Preview, Utils } from "react-awesome-query-builder";
import config from "./config";
import { ViewContext } from "../../../Views/context.js";

import "react-awesome-query-builder/css/styles.scss";
import "react-awesome-query-builder/css/compact_styles.scss";
import "react-awesome-query-builder/css/denormalize.scss";

const { queryString } = Utils;
var stringify = require("json-stringify-safe");
const Immutable = require("immutable");
const transit = require("transit-immutable-js");

var seriazlieAsImmutable = true;

var serializeTree, loadTree;
if (!seriazlieAsImmutable) {
  serializeTree = function(tree) {
    return JSON.stringify(tree.toJS());
  };
  loadTree = function(serTree) {
    let tree = JSON.parse(serTree);
    return fromJS(tree, function(key, value) {
      let outValue;
      if (key === "value" && value.get(0) && value.get(0).toJS !== undefined)
        outValue = Immutable.List.of(value.get(0).toJS());
      else
        outValue = Immutable.Iterable.isIndexed(value)
          ? value.toList()
          : value.toOrderedMap();
      return outValue;
    });
  };
} else {
  serializeTree = transit.toJSON;
  loadTree = transit.fromJSON;
}

export default class AssertionData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { templateData: {} };
    console.log(this.state)
  }

  componentDidUpdate(props){

  }

  getData = props => {
    const children = props.get("children1");

    let childObj = {};
    let result = [];

    children.map(item => {
      const properties = item.get("properties");
      let valueList = null;

      
      properties.get("value").map(list => {
        valueList = list;
        return list;
      });

      childObj = {
        path: properties.get("field"),
        operator: properties.get("operator"),
        expectedValue: valueList
      };

      result.push(childObj);
      return result;
    });
    
    this.setState({
      templateData: result
    });

    return result;
  };

  getChildren = props => {
    const jsonStyle = {
      backgroundColor: "darkgrey",
      margin: "10px",
      padding: "10px"
    };

    return (
      <div style={{ padding: "10px" }}>
        <div className="query-builder">
          <Builder {...props} />
        </div>
        <br />
        <div>
          stringFormat:
          <pre style={jsonStyle}>
            {stringify(
              queryString(props.tree, props.config, true),
              undefined,
              2
            )}
          </pre>
        </div>
      </div>
    );
  };
  render() {
    console.log(this.state);
    return (
        <ViewContext.Consumer>
          {({ assertionPathResponse, templateData }) => {
            return (
              <Query
                {...config}
                get_children={this.getChildren}
                onChange={this.getData}
              >
                {" "}
              </Query>
            );
          }}
        </ViewContext.Consumer>
    );
  }
}
