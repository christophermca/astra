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
    // propTypes: {
    //     query: React.PropTypes.object.isRequired,
    //     parent: React.PropTypes.object,
    //     index: React.PropTypes.number.isRequired
    // }

    // onOperatorChange(e) {
    //     console.log('onOperatorChange');
    //     this.props.query.set('operator', e.target.value);
    // }

    constructor(props){
        super(props);
    }

    addCondition(e) {
        this.props.query.children.push({
            type: 'Condition',
            operator: '=',
            leftOperand: '',
            rightOperand: ''
        });
    }

    addGroup(e) {
        this.props.query.children.push({
            type: 'ConditionGroup',
            operator: 'AND',
            children: []
        });
    }

    removeSelf(e) {
        if (this.props.parent) {
            this.props.parent.children.splice(this.props.index, 1);
        }
    }
    
    

    render() {
        console.log(this.props.query)
        let childrenViews = Object.keys(this.props.query).map(function(childQuery, index) {
            if (childQuery.type === 'ConditionGroup') {
                return <ConditionGroup query={childQuery} parent={this.props.query} index={index} key={index} />;
            }
            else if (childQuery.type === 'Condition') {
                return <Condition query={childQuery} parent={this.props.query} index={index} key={index} />;
            }
            else {
                console.error('invalid type: type must be ConditionGroup or Condition');
                return null;
            }
        })

        return (
            <div className="query conditionGroup">
                <select className="operators" value={this.props.query.operator} onChange={this.onOperatorChange}>
                    {operatorOptions}
                </select>
                <button className="conditionGroupButton addCondition" onClick={this.addCondition}>+ Add Condition</button>
                <button className="conditionGroupButton addGroup" onClick={this.addGroup}>+ Add Group</button>
                <button className="conditionGroupButton removeGroup" onClick={this.removeSelf}>-</button>
                <div className="childrenConditions">
                    {childrenViews}
                </div>
            </div>
        );
    }
};