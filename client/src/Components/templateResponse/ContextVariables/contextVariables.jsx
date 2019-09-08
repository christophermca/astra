import React from "react";

const ContextVariables = props => {

    // const onDelete = (e) =>{
    //     e.preventDefault();
    // }
  return (
    <div className="context">
      {props.variables.map(i => {
        return (
          <div className='contextWrapper'>
            <h1 className='contextName'> name: {i.name} </h1>
            {/* <button onClick={onDelete} className="contextDelete">X</button> */}
            <h1 className='contextValue'> Value: {i.value}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default ContextVariables;
