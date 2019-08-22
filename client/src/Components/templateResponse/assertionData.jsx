import React from "react";
import QueryBuilder from '../queryBuilder/queryBuilder.jsx';
const queryBuilder = new QueryBuilder();

export default class AssertionData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query1: null,
            query2: {
                type: 'ConditionGroup',
                operator: 'AND',
                children: [
                    {
                        type: 'Condition',
                        operator: '=',
                        leftOperand: 'color',
                        rightOperand: 'blue'
                    }
                ]
            }
        };
    }

    onQuery1Update = (queryBuilder) => {
        this.setState({
            query1: queryBuilder.getQuery()
        });
    }

    onQuery2Update = (queryBuilder) => {
        this.setState({
            query2: queryBuilder.getQuery()
        });
    }

    render() {
        var query2String = queryBuilder.queryToString(this.state.query2);

        console.log(query2String);
        return (
            <div className="queryBuilder">
                <QueryBuilder initialQuery={this.state.query2} onQueryUpdate={this.onQuery2Update} />
                <pre>{query2String}</pre>
            </div>
        );
    }
}