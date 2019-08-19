import React from 'react';
import { responseStub as stubData } from '../../Stubs/ProfileService'

export default (props) => (
  <section id="template-builderHeader">
    <input disabled placeholder={this.state.config.method} />
    <input placeholder={this.state.config.url} className="template-url" />
  </section>
  <section>
    <aside className="meta-info">
      <div>{stubData.api}</div>
    </aside>
    <TemplateBody header={this.state.config.headers}/>
    <section id="template-button">
      <button onClick={this.handleSubmit} type="submit">Send</button>
    </section>
  </section>
)
