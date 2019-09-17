import React from 'react';
import './styles.scss';

export default ({ method, url }) => (
  <header className="endpoint-template-header">
    <input name="requestType" value={method} readOnly/>
    <input name="httpUrlPathParams" value={url} className="template-url templateUrl" readOnly/>
  </header>
);

