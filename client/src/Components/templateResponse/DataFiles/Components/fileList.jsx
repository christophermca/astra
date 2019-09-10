import React from 'react';

export default (props) => {
  let id=`file-${props[0].id}`
  return (
    <div className="data-file-list-item">
      <input type="radio" checked={props[0].primary} id={id} name='dataFile' value=""/>
      <label for={id}>
        <span>
          {props[0].filePath}
        </span>
        <span>
          {props[0].id}
        </span>
        <span>
          {props[0].createDate? props[0].createDate : 'N/A'}
        </span>
        <span>
          <img src="#" height="20" width="20" />
        </span>
      </label>
    </div>
    )
}
