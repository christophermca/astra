import React from 'react';

const DisplayURLMethod = (props) => {
  console.log({ props })
  return (
  <section id={props.sectionId} className={props.className}>
      <input disabled placeholder={props.method} />
      <input placeholder={props.url} className="template-url" />
  </section>)
};

export default DisplayURLMethod;
