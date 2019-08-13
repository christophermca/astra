import React from 'react';
import { TemplateResponse } from '../Components';
import { Link } from "react-router-dom";

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
    this.setTemplateData = this.setTemplateData.bind(this)

  }

  setTemplateData(data) {
    this.setState({templateData: data})
  }

}

