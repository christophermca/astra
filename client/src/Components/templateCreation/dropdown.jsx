import React from 'react';


function Dropdown(props) {
  let stub = props.data || [];

  return (
    <select onChange={props.onChange} name={props.name}>
      <option value="" selected disabled hidden> Choose {props.name}</option>
      { stub.map(data => <option>{data}</option>) }
    </select>
  )
}
export default Dropdown
