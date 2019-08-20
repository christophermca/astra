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
                operator: '=',
                leftOperand: 'color',
                rightOperand: 'blue'
            }
        };

        this.onQuery1Update = this.onQuery1Update.bind(this);
        this.onQuery2Update = this.onQuery2Update.bind(this)
    }

    onQuery1Update(queryBuilder) {
        this.setState({
            query1: queryBuilder.getQuery()
        });
    }

    onQuery2Update(queryBuilder) {
        this.setState({
            query2: queryBuilder.getQuery()
        });
    }

    render() {
        console.log(this.state.query2.length);
        var query1String = queryBuilder.queryToString(this.state.query1);
        var query2String = queryBuilder.queryToString(this.state.query2);

        return (
            <div className="queryBuilder">
                <h2 id="default">default</h2>
                <QueryBuilder onQueryUpdate={this.onQuery1Update}/>
                <pre>{query1String}</pre>
                <h2 id="with-initial-query">with initial query</h2>
                <QueryBuilder initialQuery={this.state.query2} onQueryUpdate={this.onQuery2Update} />
                <pre>{query2String}</pre>
            </div>
        );
    }
}