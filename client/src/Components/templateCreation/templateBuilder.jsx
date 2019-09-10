import React from "react";
import "./styles/template-builder.scss";
import EndpointRequestHeader from "../shared/endpointRequestHeader";

function TemplateBuilder(props) {
  const { config } = props;
  return (
    <React.Fragment>
      <section id="template-builder">
        <EndpointRequestHeader method={config.method} url={config.url} />
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
              accept=".json"
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

export default TemplateBuilder;
