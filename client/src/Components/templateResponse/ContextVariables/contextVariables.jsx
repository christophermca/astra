import React from "react";

const ContextVariables = props => {

    
  return (
    <div className="context">
      {props.variables.map(i => {
        return (
          <div className='contextWrapper'>
            <h1 className='contextName'> {i.name}: {i.value} </h1>
          </div>
        );
      })}
    </div>
  );
};

export default ContextVariables;
