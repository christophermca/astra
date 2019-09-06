import React from "react";

const ContextVariables = props => {
  return (
    <div>
      {props.variables.map(i => {
        return (
          <>
            <h1> name: {i.name} </h1>
            <h1> Value: {i.value}</h1>
          </>
        );
      })}
    </div>
  );
};

export default ContextVariables;
