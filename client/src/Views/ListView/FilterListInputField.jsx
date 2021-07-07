import React from "react";

const FilterListInputField = ({type="text", placeholder="Search", id, value, name, onChange }) => (

  <input type={type} id={id}
         placeholder={placeholder} value={value}
         name={name} onChange={onChange}
  />
)
export default FilterListInputField;
