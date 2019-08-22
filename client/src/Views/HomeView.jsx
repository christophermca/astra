import React from "react";
import AssertionData from "../Components/templateResponse/assertionData";
import QueryBuilder from "../Components/queryBuilder/queryBuilder";

const queryBuilder = new QueryBuilder();

class Test extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const initialQuery = {
      type: "Condition",
      condition: "AND",
      children: [
        {
          type: "Condition",
          operator: "=",
          leftOperand: "color",
          rightOperand: "blue"
        }
      ]
    };

    var query2String = queryBuilder.queryToString(initialQuery);

    return (
      <React.Fragment>
        <QueryBuilder
          initialQuery={initialQuery}
          onQueryUpdate={this.onQueryUpdate}
        />

        <p>{query2String}</p>
      </React.Fragment>
    );
  }

  onQueryUpdate = () => console.log("On Query Update");
}

function Home(props) {
  return (
    <React.Fragment>
      {/* <h2> It&apos;s Astra </h2>
      <p> '*no login required*'</p> */}
      {/* <AssertionData/> */}

      <h1> Query Builder</h1>
      {/* <Test /> */}
      <AssertionData />
    </React.Fragment>
  );
}

export default Home;
