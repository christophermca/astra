import React from 'react';

const TemplateContext = React.createContext({
  uploadInlineData: () => {},
  assertionsClicked: []
});

export default TemplateContext;

