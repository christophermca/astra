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

        this.state = {
            query: {
                type: "ConditionGroup",
                operator: "AND",
                children: [{
                    
                }]
            }
        };
    }

    queryToString = query => {
        if (!query) {
            return "";
        }

        var i, length;
        var result;

        if (query.type === "ConditionGroup") {
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

    componentDidMount() {
        this.getQuery();
    }

    getQuery = () => {
        return this.state.query;
    };

    getQueryString = () => {
        return this.queryToString(this.state.query);
    };

    render() {
        if (this.state.query) {
            var childView = null;
            if (this.state.query.type === "ConditionGroup") {
                childView = (
                    <ConditionGroup
                        query={this.state.query}
                        parent={null}
                        index={0}
                    />
                );
            } else if (this.state.query.type === "Condition") {
                childView = (
                    <Condition query={this.state.query} parent={null} index={0} />
                );
            } else {
                console.error("invalid type: type must be ConditionGroup or Condition");
                return null;
            }
        }

        return <div className="queryBuilder">{childView}</div>;
    }
}
