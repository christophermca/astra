import React from 'react';
import TemplateBody from './templatebody.jsx';

export default (props) => {
  return (
    <React.Fragment>
      <section id="template-builderHeader">
        <input disabled placeholder={props.config.method} />
        <input placeholder={props.config.url} className="template-url" />
      </section>
      <section>
        <aside className="meta-info">
          <div>{props.config.api}</div>
        </aside>
        <TemplateBody header={props.config.headers}/>
        <section id="template-button">
          <button onClick={props.handleSubmit} type="submit">Send</button>
        </section>
      </section>
    </React.Fragment>
  )
}

