import React from 'react';

const TemplateHeader = (props) => {
    return(
        <div id="template-response">
                <label className="header-title">{props.name}</label>
                <p className="header-info">{props.data}</p>
        </div>
    )
}

export default TemplateHeader;
