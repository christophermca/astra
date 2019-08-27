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

    constructor(props){
        super(props);
        this.state ={
            operator: '',
            leftOperand: '',
            rightOperand: ''
        }
    }

    removeSelf=(e)=> {
        if (this.props.parent) {
            this.props.parent.children.splice(this.props.index, 1);
        }
    }

    render() {
        return (
            <div className="query condition">
                {/* <input type="text" className="operand leftOperand" defaultValue={this.state.leftOperand} onChange={this.onLeftOperandChange} /> */}
                <input   name='leftOperand' type="text" className="operand leftOperand" defaultValue={this.state.leftOperand} onChange={this.props.updateString} />
                <select  name='operator' className="operators" defaultValue={this.state.operator} onChange={this.props.updateString}>
                    {operatorOptions}
                </select>
                <input  name='rightOperand' type="text" className="operand rightOperand" defaultValue={this.state.rightOperand} onChange={this.props.updateString}/>
                <button className="conditionButton removeCondition" onClick={this.removeSelf}>-</button>
            </div>
        );
    }
};