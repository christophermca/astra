import React from "react";


// Comparison operators
var operators = [
    { value: '=',	display: '=',	className:'equal' },
    { value: '!=',	display: '!=',  className:'notEqual' },
    { value: '<',	display: '<',	className:'lessThan' },
    { value: '<=',	display: '<=',	className:'lessThanOrEqual' },
    { value: '>',	display: '>',	className:'greaterThan' },
    { value: '>=',	display: '>=',	className:'greaterThanOrEqual' }
];

// Array of options for operator select
var operatorOptions = operators.map(function(operator, index) {
    var classString = 'operator ' + operator.className;
    return (<option className={classString} value={operator.value} key={index}>{operator.display}</option>);
});


/**
 * Condition react component
 */
export default class Condition extends React.Component {
    // propTypes: {
    //     query: React.PropTypes.object.isRequired,
    //     parent: React.PropTypes.object.isRequired,
    //     index: React.PropTypes.number.isRequired
    // }

    // onOperatorChange(e) {
    //     this.props.query.set('operator', e.target.value);
    // }

    onLeftOperandChange(e) {
        this.props.query.set('leftOperand', e.target.value);
    }

    onRightOperandChange(e) {
        this.props.query.set('rightOperand', e.target.value);
    }

    removeSelf(e) {
        if (this.props.parent) {
            this.props.parent.children.splice(this.props.index, 1);
        }
    }

    render() {
        return (
            <div className="query condition">
                <input type="text" className="operand leftOperand" defaultValue={this.props.query.leftOperand} onChange={this.onLeftOperandChange} />
                <select className="operators" value={this.props.query.operator} onChange={this.onOperatorChange}>
                    {operatorOptions}
                </select>
                <input type="text" className="operand rightOperand" value={this.props.query.rightOperand} onChange={this.onRightOperandChange}/>
                <button className="conditionButton removeCondition" onClick={this.removeSelf}>-</button>
            </div>
        );
    }
};