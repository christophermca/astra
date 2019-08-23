import React from "react";
import QueryBuilder from "../queryBuilder/queryBuilder.jsx";
const queryBuilder = new QueryBuilder();

export default class AssertionData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query2: {
        type: "ConditionGroup",
        operator: "AND",
        children: [
          {
            type: "Condition",
            operator: "",
            leftOperand: "",
            rightOperand: ""
          }
        ]
      }
    };
  }

  onQuery2Update = (evt, queryBuilder) => {
    this.setState({
      query2: queryBuilder.getQuery()
    });
  };

  updateString = e => {
    const { key, name, value } = e.target;
    const query = { ...this.state.query2 };
    
    
    query.children.map((i, index) => {
      if(e.target)
        i[name] = value;
    });
    debugger;
    e.target.value  = 
    console.log("query", query);
    

    this.setState({
      query2: { ...query }
    });

  };

  addGroup = () =>{
    console.log('clicked')
  }

  addCondition = () => {
    const children = [...this.state.query2.children];

    children.push({
      type: "Condition",
      operator: "",
      leftOperand: "",
      rightOperand: ""
    });

    const query = { ...this.state.query2 };
    query.children = [...children];

    this.setState({
      query2: { ...query }
    });
  };

  render() {
    var query2String = queryBuilder.queryToString(this.state.query2);
    return (
      <div className="queryBuilder">
        <QueryBuilder
          initialQuery={this.state.query2}
          onQueryUpdate={this.onQuery2Update}
          updateString={this.updateString}
          addCondition={this.addCondition}
          addGroup={this.addGroup}
        />
        <pre>{query2String}</pre>
      </div>
    );
  }
}
