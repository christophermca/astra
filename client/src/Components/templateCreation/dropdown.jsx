import React from 'react';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props);
    console.log(props.data)


  }

  render() {
    let stub = this.props.data;
    if(stub === undefined){
      stub = []
    }
    return (
      <select name={this.props.name}>
        <option value="" selected disabled hidden> Choose {this.props.name}</option>
        {stub.map(data =>{
         return <option>{data}</option>
       })
       }}
      </select>
    )
  }
}
