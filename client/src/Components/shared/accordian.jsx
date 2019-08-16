import React from 'react';
import './style.css'

export default class Accordian extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({
            openAccordian: false,
            accordianClassname: "accordianCloseHeader"
        },
        props)
    }

    handleAccordian = () =>{
        console.log(this.state.openAccordian)
        if(this.state.openAccordian){
            this.setState({openAccordian: false, accordianClassname: "accordianCloseHeader"})
        }else{
            this.setState({openAccordian: true, accordianClassname: "accordianOpenHeader"})
        }   
    }

    render() {
    return(
        <div className="accordianWrapper">
            <div onClick={this.handleAccordian} className={this.state.accordianClassname}>
                <div className="accordianHeader">{this.props.name}</div>
                {!this.state.openAccordian && <div className="accordianState">+</div>}
                {this.state.openAccordian && <div className="accordianState">-</div>}
            </div>
            {this.state.openAccordian && <div className="accordianContent">
                <p>
                    {this.props.content}
                </p>
            </div>}
        </div>
    )}
}
