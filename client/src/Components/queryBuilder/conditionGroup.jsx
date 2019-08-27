import React from "react";
import Condition from './condition.jsx';


// Boolean operators
var operators = [
    { value: 'AND', display: 'AND', display2: 'All', className: 'and' },
    { value: 'OR',  display: 'OR',  display2: 'Any', className: 'or' }
];

// Array of options for operator select
var operatorOptions = operators.map(function(operator, index) {
    var classString = 'operator ' + operator.className;
    return <option className={classString} value={operator.value} key={index}>{operator.display}</option>;
});


/**
 * ConditionGroup react component
 */
export default class ConditionGroup extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            operator: ''
        }
    }

    addGroup = (e) =>{
        e.preventDefault();
        this.props.query.children.push({
            type: 'ConditionGroup',
            operator: this.state.operator,
            children: []
        });
    }

    onOperatorChange = (e) =>{
        this.setState({
            operator: e.target.value
        })
    }

    removeSelf = (e) => {
        e.preventDefault();
        if (this.props.parent) {
            this.props.parent.children.splice(this.props.index, 1);
        }
    }

    render() {
        let childrenViews = this.props.query.children.map((childQuery, index) =>{
            if (childQuery.type === 'ConditionGroup') {
                return <ConditionGroup query={childQuery} parent={this.props.query} index={index} key={index} />;
            }
            else if (childQuery.type === 'Condition') {
                return <Condition query={childQuery} parent={this.props.query} index={index} key={index} updateString={this.props.updateString}/>;
            }
            else {
                console.error('invalid type: type must be ConditionGroup or Condition');
                return null;
            }
        });

        return (
            <div className="query conditionGroup">
                <select name="ConditionGroup" className="operators" value={this.props.query.operator} onChange={this.onOperatorChange}>
                    {operatorOptions}
                </select>


                <button
                    className="conditionGroupButton addCondition"
                    onClick={this.props.addCondition}
                >
                        + Add Condition
                </button>


                <button className="conditionGroupButton addGroup" onClick={this.props.addGroup}>+ Add Group</button>
                <button className="conditionGroupButton removeGroup" onClick={this.removeSelf}>-</button>
                <div className="childrenConditions">
                    {childrenViews}
                </div>
            </div>
        );
    }
};