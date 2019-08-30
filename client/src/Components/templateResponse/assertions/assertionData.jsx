import React from 'react';
import { fromJS } from 'immutable';
import {Query, Builder, Preview, Utils} from 'react-awesome-query-builder';
import config from './config';

import 'react-awesome-query-builder/css/styles.scss';
import 'react-awesome-query-builder/css/compact_styles.scss';
import 'react-awesome-query-builder/css/denormalize.scss';


const {queryBuilderFormat, queryString, mongodbFormat} = Utils;
var stringify = require('json-stringify-safe');
const Immutable = require('immutable');
const transit = require('transit-immutable-js');


var seriazlieAsImmutable = true;

var serializeTree, loadTree, initValue;
if (!seriazlieAsImmutable) {
    serializeTree = function(tree) {
        return JSON.stringify(tree.toJS());
    };
    loadTree = function(serTree) {
        let tree = JSON.parse(serTree);
        return fromJS(tree, function (key, value) {
          let outValue;
          if (key == 'value' && value.get(0) && value.get(0).toJS !== undefined)
            outValue = Immutable.List.of(value.get(0).toJS());
          else
            outValue = Immutable.Iterable.isIndexed(value) ? value.toList() : value.toOrderedMap();
          return outValue;
        });
    };
    initValue = '{"type":"group","id":"9a99988a-0123-4456-b89a-b1607f326fd8","children1":{"a98ab9b9-cdef-4012-b456-71607f326fd9":{"type":"rule","id":"a98ab9b9-cdef-4012-b456-71607f326fd9","properties":{"field":"multicolor","operator":"multiselect_equals","value":[["yellow","green"]],"valueSrc":["value"],"operatorOptions":null,"valueType":["multiselect"]},"path":["9a99988a-0123-4456-b89a-b1607f326fd8","a98ab9b9-cdef-4012-b456-71607f326fd9"]}},"properties":{"conjunction":"AND","not":false},"path":["9a99988a-0123-4456-b89a-b1607f326fd8"]}'
} else {
    serializeTree = transit.toJSON;
    loadTree = transit.fromJSON;
    initValue = '["~#iM",["type","group","id","9a99988a-0123-4456-b89a-b1607f326fd8","children1",["~#iOM",["a98ab9b9-cdef-4012-b456-71607f326fd9",["^0",["type","rule","id","a98ab9b9-cdef-4012-b456-71607f326fd9","properties",["^0",["field","multicolor","operator","multiselect_equals","value",["~#iL",[["yellow","green"]]],"valueSrc",["^2",["value"]],"operatorOptions",null,"valueType",["^2",["multiselect"]]]],"path",["^2",["9a99988a-0123-4456-b89a-b1607f326fd8","a98ab9b9-cdef-4012-b456-71607f326fd9"]]]]]],"properties",["^0",["conjunction","AND","not",false]],"path",["^2",["9a99988a-0123-4456-b89a-b1607f326fd8"]]]]'
}

const AssertionData = () =>{
    const {tree, ...config_props} = config;
    const getChildren = (props) =>{
        const jsonStyle = { backgroundColor: 'darkgrey', margin: '10px', padding: '10px' } 
        return (
            <div style={{padding: '10px'}}>
                <div className="query-builder">
                    <Builder {...props} />
                </div>
                <br />
                <div>
                  stringFormat: 
                  <pre style={jsonStyle}>
                    {stringify(queryString(props.tree, props.config), undefined, 2)}
                  </pre>
                </div>
                <hr/>
                <div>
                  humanStringFormat: 
                  <pre style={jsonStyle}>
                    {stringify(queryString(props.tree, props.config, true), undefined, 2)}
                  </pre>
                </div>
            </div>
        )
    }

    return(
        <div className="queryBuilder">
            <Query 
                    value={loadTree(initValue)}
                    {...config} 
                    get_children={getChildren}
                > </Query>
        </div>
    )
}

export default AssertionData;