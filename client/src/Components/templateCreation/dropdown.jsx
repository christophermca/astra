import React from 'react';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props);
  }

  render() {
    return (
      <select name={this.props.name}>
        <option value="" selected disabled hidden> Choose {this.props.name}</option>
      </select>
    )
  }


}
