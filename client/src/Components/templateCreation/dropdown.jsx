import React from 'react';


function Dropdown(props) {
  let stub = props.data || [];

  return (
    <select onChange={props.onChange} name={props.name}>
      <option value="" selected disabled hidden> Choose {props.name}</option>
    // TODO logic should be handled by the profile service
      { stub.map(data => data === 'rest' ? <option selected="selected">{data}</option> : <option>{data}</option>) }}
    </select>
  )
}
export default Dropdown
