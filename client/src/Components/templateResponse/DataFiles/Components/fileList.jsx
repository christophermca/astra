import React from 'react';

export default (props) => {
  let id=``;
  return (
    <div className="data-file-list-item">
      <input type="radio" checked={false} id={id} name='dataFile' value=""/>
      <label for={id}>
        <span>
          {props[0].file_name}
        </span>
        <span>
          <a download href="/api/files/download"><img src="#" height="20" width="20" /></a>
        </span>
      </label>
    </div>
    )
}
