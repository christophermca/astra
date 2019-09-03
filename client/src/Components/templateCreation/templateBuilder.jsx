import React from "react";
import './styles/template-builder.scss'

function TemplateBuilder(props) {
  const {config} = props
  return (
    <React.Fragment>
      <section id="template-builder">
        <header>
          <input name="requestType" value={config.method} />
          <input name="httpUrlPathParams" defaultValue={config.url} className="template-url" />
        </header>
        <aside className="meta-info">
          <div>{config.protocol}</div>
        </aside>
        <main>
          <div id="endpoint-headers"> </div>
          <div>
            <input
              name="files"
              id="input-file"
              type="file"
              accept=".csv,.xls "
              multiple
            />
          </div>
        </main>
      </section>
      <section id="template-button">
        <button type="submit">Send</button>
      </section>
    </React.Fragment>
  );
}

export default TemplateBuilder
