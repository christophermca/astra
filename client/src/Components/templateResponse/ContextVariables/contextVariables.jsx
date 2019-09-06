import React from 'react';

const ContextVariables = (props) =>{
    
    
return(
    <div>
        {props.variables.map(i =>{
            return (<>
            <h1> {i.name }</h1>
            <h1> {i.value }</h1>
            </>)
        })}
    </div>
)
}

export default ContextVariables;
