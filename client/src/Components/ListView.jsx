import React from 'react';
import CardComponent from './cardComponent/index.jsx';

export default class ListView extends React.Component {
  componentDidMount() {
    fetch('/api/test', (req, res) => {
      return this.setState('data', res.json);
    })
  }


  render() {
    return <CardComponent />
  }
}
