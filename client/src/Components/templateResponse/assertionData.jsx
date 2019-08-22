import React from "react";
import QueryBuilder from '../queryBuilder/queryBuilder.jsx';
const queryBuilder = new QueryBuilder();

export default class AssertionData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query2: {
                type: 'ConditionGroup',
                operator: 'AND',
                children: [
                    {
                        type: 'Condition',
                        operator: '',
                        leftOperand: '',
                        rightOperand: ''
                    }
                ]
            }
        };
    }

    onQuery2Update = (evt, queryBuilder) => {
        console.log(evt.target.value)

        this.setState({
            query2: queryBuilder.getQuery()
        });
    }

    updateString = (e) => {
        const { name, value } = e.target
        const query = { ...this.state.query2 }
        query.children[0][name] = value

        this.setState({
           query2: {...query}
        })
    }

    addCondition = () => {
        const children = [...this.state.query2.children]

        children.push(                    {
            type: 'Condition',
            operator: '',
            leftOperand: '',
            rightOperand: ''
        })

        const query = { ...this.state.query2 }
        query.children = [...children]

        this.setState({
            query2: { ...query }
        })
    }

    render() {
        console.log(this.state.query2);
        var query2String = queryBuilder.queryToString(this.state.query2);

        console.log(query2String);
        return (
            <div className="queryBuilder">
                <QueryBuilder
                    initialQuery={this.state.query2}
                    onQueryUpdate={this.onQuery2Update}
                    updateString={this.updateString}
                    addCondition={this.addCondition}
                />
                <pre>{query2String}</pre>
            </div>
        );
    }
}