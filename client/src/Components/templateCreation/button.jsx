import React from 'react';

export default class Button extends React.Component{
    constructor(props){
        super(props)
        this.state = Object.assign({}, props)
        console.log("hit")
    }

    onSubmit = (e) =>{
        e.preventDefault();
        console.log(this.props);
    }
    render(){
        return(
            <div >
                <button onClick={this.onSubmit} type="submit">Send</button>
            </div>
        )
    }
}