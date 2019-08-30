import React from "react";

function TemplateBuilder(props) {
  const { config } = props;
  return (
    <React.Fragment>
      <section id="template-builderHeader">
        <input name="requestType" value={config.method} />
        <input
          name="httpUrlPathParams"
          defaultValue={config.url}
          className="template-url"
        />
      </section>
      <section>
        <aside className="meta-info">
          <div>{config.protocol}</div>
        </aside>
        <input
          name="files"
          id="input-file"
          type="file"
          accept=".csv,.xls "
          multiple
        />
      </section>{" "}
      <section id="template-button">
        <button type="submit">Send</button>
      </section>
    </React.Fragment>
  );
}

export default TemplateBuilder;
