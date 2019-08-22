import React from "react";
import ConditionGroup from "./conditionGroup.jsx";
import Condition from "./condition.jsx";

/**
 * QueryBuilder react component
 */
export default class QueryBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.queryToString = this.queryToString.bind(this);
    }

    queryToString = query => {
        if (!query) {
            return "";
        }

        var i, length;
        var result = '';
        if (query.type === "ConditionGroup") {
            console.log(result)
            result = "(";

            for (i = 0, length = query.children.length; i < length; ++i) {
                result += this.queryToString(query.children[i]);

                if (i + 1 < length) {
                    result += " " + query.operator + " ";
                }
            }

            result += ")";
        } else if (query.type === "Condition") {
            result =
                query.leftOperand + " " + query.operator + " " + query.rightOperand;
        } else {
            console.error("invalid type: type must be ConditionGroup or Condition");
            return "";
        }

        console.log(result)
        return result;
    };

    // getDefaultProps = () => {
    //     return {
    //         initialQuery: {
    //             type: "ConditionGroup",
    //             operator: "AND",
    //             children: []
    //         },
    //         onQueryUpdate: function (queryBuilder) { }
    //     };
    // };

    //   getInitialState = () => {
    //     var queryFreezerStore = new Freezer(this.props.initialQuery);
    //     var query = queryFreezerStore.get();

    //     return {
    //       queryFreezerStore: queryFreezerStore,
    //       query: query
    //     };
    //   };

    // componentDidMount() {
        // this.getQuery();
        
        // // Update state every time query changes
        // this.setState({
        //     query: this.getQuery()
        // });

        // this.props.onQueryUpdate(this);
    // }



    getQuery = () => {
        return this.props.initialQuery;
    };

    getQueryString = () => {
        return this.queryToString(this.props.initialQuery);
    };

    render() {
        console.log(this.props.initialQuery)
        if (this.props.initialQuery) {
            var childView = null;
            if (this.props.initialQuery.type === "ConditionGroup") {
                console.log({queryBuilder: this.props})
                childView = (
                    <ConditionGroup
                        query={this.props.initialQuery}
                        parent={null}
                        index={0}
                        updateString={this.props.updateString}
                        addCondition={this.props.addCondition}
                    />
                );
            } else if (this.props.initialQuery.type === "Condition") {
                childView = (
                    <Condition query={this.props.initialQuery} parent={null} index={0} updateString={this.props.updateString} />
                );
            } else {
                console.error("invalid type: type must be ConditionGroup or Condition");
                return null;
            }
        }

        return <div className="queryBuilder">{childView}</div>;
    }
}
