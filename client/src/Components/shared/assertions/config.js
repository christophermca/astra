import React from 'react';
import { Widgets, Operators } from 'react-awesome-query-builder';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import { ViewContext } from '../../../Views/context';

const {
    TextWidget,
    NumberWidget,
    SliderWidget,
    RangeWidget,
    SelectWidget,
    MultiSelectWidget,
    DateWidget,
    BooleanWidget,
    TimeWidget,
    DateTimeWidget,
    ValueFieldWidget
} = Widgets;

const { ProximityOperator } = Operators;


export default {
    conjunctions: {
        AND: {
            label: 'And',
            mongoConj: '$and',
            reversedConj: 'OR',
            formatConj: (children, conj, not, isForDisplay) => {
                return children.size > 1 ?
                    (not ? "NOT " : "") + '(' + children.join(' ' + (isForDisplay ? "AND" : "&&") + ' ') + ')'
                    : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
            },
        },
        OR: {
            label: 'Or',
            mongoConj: '$or',
            reversedConj: 'AND',
            formatConj: (children, conj, not, isForDisplay) => {
                return children.size > 1 ?
                    (not ? "NOT " : "") + '(' + children.join(' ' + (isForDisplay ? "OR" : "||") + ' ') + ')'
                    : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
            },
        },
    },
    fields: {
        sabah: {
            label: 'label',
            type: 'text',
            operators: ['equal', 'not_equal', 'greater', 'less'],
            defaultOperator: 'not_equal', //will not be used
        },
        test: {
            label: 'Test',
            type: 'text',
            operators: ['equal', 'not_equal', 'greater', 'less'],
            defaultOperator: 'not_equal', //will not be used
        },
        value: {
            label: 'value',
            type: 'text',
            operators: ['equal', 'not_equal', 'greater', 'less'],
            defaultOperator: 'not_equal', //will not be used
        },
        key: {
            label: 'key',
            type: 'text',
            operators: ['equal', 'not_equal', 'greater', 'less'],
            defaultOperator: 'not_equal', //will not be used
        },
    },
    types: {
        text: {
            widgets: {
                text: {
                    defaultOperator: 'is_empty',
                    operators: [
                        'equal',
                        'not_equal',
                        "is_empty",
                        "is_not_empty",
                        'proximity'
                    ],
                    widgetProps: {
                        formatValue: (val, fieldDef, wgtDef, isForDisplay) => (JSON.stringify(val)),
                        valueLabel: "Text",
                        valuePlaceholder: "Enter text",
                    }
                },
                field: {
                    operators: [
                        'equal',
                        'not_equal',
                        'greater',
                        'less',
                        //note that unary ops will be excluded anyway, see getWidgetsForFieldOp()
                        //"is_empty",
                        //"is_not_empty",
                        'proximity'
                    ],
                }
            },
        },
    },
    operators: {
        equal: {
            label: '==',
            labelForFormat: '==',
            reversedOp: 'not_equal',
            mongoFormatOp: (field, op, value) => ({ [field]: { '$eq': value } }),
        },
        not_equal: {
            label: '!=',
            labelForFormat: '!=',
            reversedOp: 'equal',
            mongoFormatOp: (field, op, value) => ({ [field]: { '$ne': value } }),
        },
        less: {
            label: '<',
            labelForFormat: '<',
            reversedOp: 'greater_or_equal',
            mongoFormatOp: (field, op, value) => ({ [field]: { '$lt': value } }),
        },
        less_or_equal: {
            label: '<=',
            labelForFormat: '<=',
            reversedOp: 'greater',
            mongoFormatOp: (field, op, value) => ({ [field]: { '$lte': value } }),
        },
        greater: {
            label: '>',
            labelForFormat: '>',
            reversedOp: 'less_or_equal',
            mongoFormatOp: (field, op, value) => ({ [field]: { '$gt': value } }),
        },
        greater_or_equal: {
            label: '>=',
            labelForFormat: '>=',
            reversedOp: 'less',
            mongoFormatOp: (field, op, value) => ({ [field]: { '$gte': value } }),
        },
        between: {
            label: 'Between',
            labelForFormat: 'BETWEEN',
            cardinality: 2,
            formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
                let valFrom = values.first();
                let valTo = values.get(1);
                if (isForDisplay)
                    return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
                else
                    return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { '$gte': values[0], '$lte': values[1] } }),
            valueLabels: [
                'Value from',
                'Value to'
            ],
            textSeparators: [
                null,
                'and'
            ],
            reversedOp: 'not_between',
        },
        not_between: {
            label: 'Not between',
            labelForFormat: 'NOT BETWEEN',
            cardinality: 2,
            mongoFormatOp: (field, op, values) => ({ [field]: { '$not': { '$gte': values[0], '$lte': values[1] } } }),
            valueLabels: [
                'Value from',
                'Value to'
            ],
            textSeparators: [
                null,
                'and'
            ],
            reversedOp: 'between',
        },
        range_between: {
            label: 'Between',
            labelForFormat: 'BETWEEN',
            cardinality: 2,
            isSpecialRange: true, // to show 1 range widget instead of 2
            formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
                let valFrom = values.first();
                let valTo = values.get(1);
                if (isForDisplay)
                    return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
                else
                    return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { '$gte': values[0], '$lte': values[1] } }),
            valueLabels: [
                'Value from',
                'Value to'
            ],
            textSeparators: [
                null,
                'and'
            ],
            reversedOp: 'range_not_between',
        },
        range_not_between: {
            label: 'Not between',
            labelForFormat: 'NOT BETWEEN',
            cardinality: 2,
            isSpecialRange: true, // to show 1 range widget instead of 2
            mongoFormatOp: (field, op, values) => ({ [field]: { '$not': { '$gte': values[0], '$lte': values[1] } } }),
            valueLabels: [
                'Value from',
                'Value to'
            ],
            textSeparators: [
                null,
                'and'
            ],
            reversedOp: 'range_between',
        },
        is_empty: {
            isUnary: true,
            label: 'Is Empty',
            labelForFormat: 'IS EMPTY',
            cardinality: 0,
            reversedOp: 'is_not_empty',
            formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                return isForDisplay ? `${field} IS EMPTY` : `!${field}`;
            },
            mongoFormatOp: (field, op) => ({ [field]: { '$exists': false } }),
        },
        is_not_empty: {
            isUnary: true,
            label: 'Is not empty',
            labelForFormat: 'IS NOT EMPTY',
            cardinality: 0,
            reversedOp: 'is_empty',
            formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                return isForDisplay ? `${field} IS NOT EMPTY` : `!!${field}`;
            },
            mongoFormatOp: (field, op) => ({ [field]: { '$exists': true } }),
        },
        select_equals: {
            label: '==',
            labelForFormat: '==',
            formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                return `${field} == ${value}`;
            },
            mongoFormatOp: (field, op, value) => ({ [field]: { '$eq': value } }),
            reversedOp: 'select_not_equals',
        },
        select_not_equals: {
            label: '!=',
            labelForFormat: '!=',
            formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                return `${field} != ${value}`;
            },
            mongoFormatOp: (field, op, value) => ({ [field]: { '$ne': value } }),
            reversedOp: 'select_equals',
        },
        select_any_in: {
            label: 'Any in',
            labelForFormat: 'IN',
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                if (valueSrc === 'value')
                    return `${field} IN (${values.join(', ')})`;
                else
                    return `${field} IN (${values})`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { '$in': values } }),
            reversedOp: 'select_not_any_in',
        },
        select_not_any_in: {
            label: 'Not in',
            labelForFormat: 'NOT IN',
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                if (valueSrc === 'value')
                    return `${field} NOT IN (${values.join(', ')})`;
                else
                    return `${field} NOT IN (${values})`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { '$nin': values } }),
            reversedOp: 'select_any_in',
        },
        multiselect_equals: {
            label: 'Equals',
            labelForFormat: '==',
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                if (valueSrc === 'value')
                    return `${field} == [${values.join(', ')}]`;
                else
                    return `${field} == ${values}`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { '$eq': values } }),
            reversedOp: 'multiselect_not_equals',
        },
        multiselect_not_equals: {
            label: 'Not equals',
            labelForFormat: '!=',
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                if (valueSrc === 'value')
                    return `${field} != [${values.join(', ')}]`;
                else
                    return `${field} != ${values}`;
            },
            mongoFormatOp: (field, op, values) => ({ [field]: { '$ne': values } }),
            reversedOp: 'multiselect_equals',
        },
        proximity: {
            label: 'Proximity search',
            cardinality: 2,
            valueLabels: [
                { label: 'Word 1', placeholder: 'Enter first word' },
                'Word 2'
            ],
            textSeparators: [
                //'Word 1',
                //'Word 2'
            ],
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                let val1 = values.first();
                let val2 = values.get(1);
                return `${field} ${val1} NEAR/${operatorOptions.get('proximity')} ${val2}`;
            },
            mongoFormatOp: (field, op, values) => (undefined),
            options: {
                optionLabel: "Near",
                optionTextBefore: "Near",
                optionPlaceholder: "Select words between",
                factory: (props) => <ProximityOperator {...props} />,
                defaults: {
                    proximity: 2
                }
            }
        },  
    },
    widgets: {
        text: {
            type: "text",
            valueSrc: 'value',
            factory: (props) => <TextWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? '"' + val + '"' : JSON.stringify(val);
            },
            validateValue: (val, fieldDef) => {
                return (val !== "test");
            },
        },
        number: {
            type: "number",
            valueSrc: 'value',
            factory: (props) => <NumberWidget {...props} />,
            valueLabel: "Number",
            valuePlaceholder: "Enter number",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? val : JSON.stringify(val);
            },
            //mongoFormatValue: (val, fieldDef, wgtDef) => (Number(val)),
        },
        slider: {
            type: "number",
            valueSrc: 'value',
            factory: (props) => <SliderWidget {...props} />,
            valueLabel: "Slider",
            valuePlaceholder: "Move Slider",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? val : JSON.stringify(val);
            },
            customProps: {
                width: '300px'
            }
        },
        rangeslider: {
            type: "number",
            valueSrc: 'value',
            factory: (props) => <RangeWidget {...props} />,
            valueLabel: "Range",
            valuePlaceholder: "Select Range",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? val : JSON.stringify(val);
            },
            customProps: {
                width: '300px'
            },
            singleWidget: 'slider',
            valueLabels: [
                'Value from',
                'Value to'
            ],
            textSeparators: [
                null,
                'and'
            ],
        },
        select: {
            type: "select",
            valueSrc: 'value',
            factory: (props) => <SelectWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                let valLabel = fieldDef.listValues[val];
                return isForDisplay ? '"' + valLabel + '"' : JSON.stringify(val);
            },
        },
        multiselect: {
            type: "multiselect",
            valueSrc: 'value',
            factory: (props) => <MultiSelectWidget {...props} />,
            formatValue: (vals, fieldDef, wgtDef, isForDisplay) => {
                let valsLabels = vals.map(v => fieldDef.listValues[v]);
                return isForDisplay ? valsLabels.map(v => '"' + v + '"') : vals.map(v => JSON.stringify(v));
            },
        },
        date: {
            type: "date",
            valueSrc: 'value',
            factory: (props) => <DateWidget {...props} />,
            dateFormat: 'DD.MM.YYYY',
            valueFormat: 'YYYY-MM-DD',
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                let dateVal = moment(val, wgtDef.valueFormat);
                return isForDisplay ? '"' + dateVal.format(wgtDef.dateFormat) + '"' : JSON.stringify(val);
            },
        },
        time: {
            type: "time",
            valueSrc: 'value',
            factory: (props) => <TimeWidget {...props} />,
            timeFormat: 'HH:mm',
            valueFormat: 'HH:mm:ss',
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                let dateVal = moment(val, wgtDef.valueFormat);
                return isForDisplay ? '"' + dateVal.format(wgtDef.timeFormat) + '"' : JSON.stringify(val);
            },
        },
        datetime: {
            type: "datetime",
            valueSrc: 'value',
            factory: (props) => <DateTimeWidget {...props} />,
            timeFormat: 'HH:mm',
            dateFormat: 'DD.MM.YYYY',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                let dateVal = moment(val, wgtDef.valueFormat);
                return isForDisplay ? '"' + dateVal.format(wgtDef.dateFormat + ' ' + wgtDef.timeFormat) + '"' : JSON.stringify(val);
            },
        },
        boolean: {
            type: "boolean",
            valueSrc: 'value',
            factory: (props) => <BooleanWidget {...props} />,
            labelYes: "Yes",
            labelNo: "No ",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? (val ? "Yes" : "No") : JSON.stringify(!!val);
            },
            defaultValue: false,
        },
        field: {
            valueSrc: 'field',
            factory: (props) => <ValueFieldWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay, valFieldDef) => {
                return isForDisplay ? (valFieldDef.label || val) : val;
            },
            valueLabel: "Field to compare",
            valuePlaceholder: "Select field to compare",
            customProps: {
                showSearch: true
            }
        }
    },
    settings: {
        locale: {
            short: 'en',
            full: 'en-US',
            antd: en_US,
        },
        maxLabelsLength: 50,
        hideConjForOne: true,
        renderSize: 'small',
        renderConjsAsRadios: false,
        renderFieldAndOpAsDropdown: false,
        customFieldSelectProps: {
            showSearch: true
        },
        groupActionsPosition: 'topRight', // oneOf [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight]
        setOpOnChangeField: ['keep', 'default'], // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
        clearValueOnChangeField: false, //false - if prev & next fields have same type (widget), keep
        clearValueOnChangeOp: false,
        setDefaultFieldAndOp: false,
        maxNesting: 10,
        fieldSeparator: '.',
        fieldSeparatorDisplay: '->',
        showLabels: false,
        valueLabel: "Value",
        valuePlaceholder: "Value",
        fieldLabel: "Field",
        operatorLabel: "Operator",
        fieldPlaceholder: "Select field",
        operatorPlaceholder: "Select operator",
        deleteLabel: null,
        addGroupLabel: "Add group",
        addRuleLabel: "Add rule",
        readonlyMode: false,
        notLabel: "Not",
        removeRuleConfirmOptions: {
            title: 'Are you sure delete this rule?',
            okText: 'Yes',
            okType: 'danger',
        },
        removeGroupConfirmOptions: {
            title: 'Are you sure delete this group?',
            okText: 'Yes',
            okType: 'danger',
        },
        showNot: true,
        delGroupLabel: null,
        canLeaveEmptyGroup: true, //after deletion
        formatReverse: (q, operator, reversedOp, operatorDefinition, revOperatorDefinition, isForDisplay) => {
            if (isForDisplay)
                return "NOT(" + q + ")";
            else
                return "!(" + q + ")";
        },
        formatField: (field, parts, label2, fieldDefinition, config, isForDisplay) => {
            if (isForDisplay)
                return label2;
            else
                return field;
        },
        valueSourcesInfo: {
            value: {
                label: "Value"
            },
        },
        valueSourcesPopupTitle: "Select value source",
        canReorder: true,
        canCompareFieldWithField: (leftField, leftFieldConfig, rightField, rightFieldConfig) => {
            //for type == 'select'/'multiselect' you can check listValues
            return true;
        },
    }
};

