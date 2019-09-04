import React from 'react';

export default (props) => {
  let id=`file-${props.id}`
  return (
    <div className="data-file-list-item">
      <input type="radio" checked={props.primary} id={id} name='dataFile' value=""/>
      <label for={id}>
        <span>
          {props.filePath}
        </span>
        <span>
          {props.id}
        </span>
        <span>
          {props.createData? props.createData : 'N/A'}
        </span>
        <span>
          <img src="#" height="20" width="20" />
        </span>
      </label>
    </div>
    )
}
