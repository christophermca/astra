/* This file will be used to combine all components into a single library that
 * we will that reference in App.js*/

import TemplateCreation  from './templateCreation/index.jsx';
import Leftnav from './leftNav/index.jsx';
import TemplateResponse from './templateResponse/index.jsx';
import CardComponent from './cardComponent/index.jsx'

export {
  CardComponent,
  Leftnav,
  TemplateCreation,
  TemplateResponse
}
