import React from 'react';

const toggle = (evt) => {
  const el = evt.target
  debugger
}

const TemplateHeader = (props) => {
    return(
      <div className="template-response">
        <label className="header-title" onClick="toggle()">{props.name}</label>
        <p className="header-info">{props.data}</p>
      </div>
    )
}

export default TemplateHeader;
